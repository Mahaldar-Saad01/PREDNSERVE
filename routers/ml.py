from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import os
import models
from database import get_db
from auth import get_current_user
from pydantic import BaseModel

class Predictionmain(BaseModel):
    day_of_week:str
    temperature: float
    weather:str
    event:str
    is_weekend: int
    promotion: int

class PredictionInput(BaseModel):
    day_of_week:str
    temperature: float
    weather:str
    event:str
    is_weekend: int
    menu_item:str
    price:int
    promotion: int

router = APIRouter(prefix="/ml", tags=["Machine Learning"])

UPLOAD_DIR = "dataset"



@router.post("/restaurants/{restaurant_id}/upload-dataset")
async def upload_dataset(
    restaurant_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    # Check restaurant exists
    restaurant = db.query(models.Restaurant).filter(
        models.Restaurant.res_id== restaurant_id
    ).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    # Check ownership
    if restaurant.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Check file type
    if not file.filename.endswith((".csv", ".xlsx")):
        raise HTTPException(status_code=400, detail="Only CSV or Excel allowed")

    # Create datasets folder if not exists
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    filepath = f"{UPLOAD_DIR}/restaurant_{restaurant_id}_dataset.csv"

    with open(filepath, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "message": "Dataset uploaded successfully",
        "file_path": filepath
    }


import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import GridSearchCV
import joblib
import json


MODEL_DIR = "models_storage"
DATASET_DIR = "dataset"



@router.post("/restaurants/{restaurant_id}/train-model")
def train_model(
    restaurant_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    restaurant = db.query(models.Restaurant).filter(
        models.Restaurant.res_id == restaurant_id
    ).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    if restaurant.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Find dataset
    dataset_path = f"{DATASET_DIR}/restaurant_{restaurant_id}_dataset.csv"

    if not os.path.exists(dataset_path):
        raise HTTPException(status_code=404, detail="Dataset not found")

    # Read dataset
    df = pd.read_csv(dataset_path)

    # menu items extraction for future use in predict end point
    menu_dict = (
    df[["menu_item", "price"]]
    .drop_duplicates()
    .set_index("menu_item")["price"]
    .to_dict()
)
    # save menu items
    menu_path = f"{MODEL_DIR}/restaurant_{restaurant_id}_menu.json"

    os.makedirs(MODEL_DIR, exist_ok=True)

    with open(menu_path, "w") as f:
        json.dump(menu_dict, f)
    # Basic training logic
    if "actual_sales" not in df.columns:
        raise HTTPException(status_code=400, detail="Dataset must contain 'actual_sales' column")

    X = df.drop("actual_sales", axis=1)
    Y = df["actual_sales"]

    num_features = ["temperature", "price"]

    cat_features = [
        "day_of_week",
        "weather",
        "event",
        "menu_item"
    ]

    bin_features = ["is_weekend", "promotion"]

    num_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median"))
    ])

    cat_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("encoder", OneHotEncoder(handle_unknown="ignore"))
    ])

    bin_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent"))
    ])

    preprocessor = ColumnTransformer([
        ("num", num_pipeline, num_features),
        ("cat", cat_pipeline, cat_features),
        ("bin", bin_pipeline, bin_features)
    ])

    pipeline = Pipeline([
        ("preprocessing", preprocessor),
        ("model", RandomForestRegressor(random_state=42))
    ])

    param_grid = {
    "model__n_estimators": [100,200],
    "model__max_depth": [10,20,None],
    "model__min_samples_split": [2,5],
    "model__min_samples_leaf": [1,2]
    }

    grid_search = GridSearchCV(
        pipeline,
        param_grid,
        cv=5,
        scoring="r2",
        n_jobs=-1
    )

    grid_search.fit(X, Y)

    best_model = grid_search.best_estimator_

    os.makedirs(MODEL_DIR, exist_ok=True)

    model_path = f"{MODEL_DIR}/restaurant_{restaurant_id}.pkl"
    
    joblib.dump(best_model, model_path)

    # delete dataset after training
    if os.path.exists(dataset_path):
        os.remove(dataset_path)


    return {
        "message": "Model trained successfully",
        "best_params": grid_search.best_params_,
        "best_score": grid_search.best_score_
    }



@router.post("/restaurants/{restaurant_id}/predict")
def predict_sales(
    restaurant_id: int,
    data: Predictionmain,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    restaurant = db.query(models.Restaurant).filter(
        models.Restaurant.res_id == restaurant_id
    ).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    if restaurant.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    model_path = f"{MODEL_DIR}/restaurant_{restaurant_id}.pkl"
    menu_path = f"{MODEL_DIR}/restaurant_{restaurant_id}_menu.json"

    if not os.path.exists(model_path):
        raise HTTPException(status_code=404, detail="Model not trained")

    model = joblib.load(model_path)

    results = []

    with open(menu_path) as f:
        MENU_DATA = json.load(f)


    for item,price in MENU_DATA.items():

        input_data = {
            "day_of_week": data.day_of_week,
            "temperature": data.temperature,
            "weather": data.weather,
            "event": data.event,
            "is_weekend": data.is_weekend,
            "menu_item": item,
            "price": price,
            "promotion": data.promotion
        }

        df = pd.DataFrame([input_data])

        predicted_sales = int(model.predict(df)[0])

        production = int(predicted_sales * 1.15)   # produce 15% extra

        wastage = production - predicted_sales

        results.append({
            "menu_item": item,
            "predicted_sales": predicted_sales,
            "production": production,
            "wastage": wastage
        })

    # sort by predicted sales
    results = sorted(results, key=lambda x: x["predicted_sales"], reverse=True)

    return {
        "restaurant_id": restaurant_id,
        "day": data.day_of_week,
        "menu_predictions": results
    }
    # model = RandomForestRegressor()
    # model.fit(X, y)

    # # Save trained model
    # os.makedirs(MODEL_DIR, exist_ok=True)

    # model_path = f"{MODEL_DIR}/restaurant_{restaurant_id}_model.joblib"

    # joblib.dump(model, model_path)

    # return {
    #     "message": "Model trained successfully",
    #     "model_path": model_path
    # }