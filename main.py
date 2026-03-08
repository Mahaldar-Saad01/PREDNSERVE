from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import User, Restaurant, Base
from database import SessionLocal, engine, get_db
import auth
from datetime import datetime
from auth import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from routers import ml

from pydantic import BaseModel, Field, EmailStr

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)


# -------------------------
# Pydantic Models
# -------------------------

class UserCreate(BaseModel):
    username: str = Field(..., max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=4, max_length=7)


class LoginRequest(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


class RestaurantCreate(BaseModel):
    res_name: str


class RestaurantResponse(BaseModel):
    res_id: int
    res_name: str
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Include ML router
app.include_router(ml.router)


# -------------------------
# API Endpoints
# -------------------------

@app.get('/')
def home():
    return {"greeting": "welcome to PREDNSERVE"}


# Register User
@app.post("/home/register_user", response_model=UserResponse)
def create_user(obj: UserCreate, db: Session = Depends(get_db)):

    hashed = auth.hash_password(obj.password)

    db_user = User(
        username=obj.username,
        email=obj.email,
        hashed_password=hashed
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


# Login
@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):

    db_user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email")

    if not auth.verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid password")

    token = auth.create_access_token({"user_id": db_user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# Add Restaurant
@app.post("/add_restaurant", response_model=RestaurantResponse)
def add_restaurant(
    restaurant: RestaurantCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_restaurant = Restaurant(
        res_name=restaurant.res_name,
        owner_id=current_user.id
    )

    db.add(new_restaurant)
    db.commit()
    db.refresh(new_restaurant)

    return new_restaurant


# Get Restaurants (ONLY FOR CURRENT USER)
@app.get("/restaurants/")
def read_restaurants(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    restaurants = db.query(Restaurant).filter(
        Restaurant.owner_id == current_user.id
    ).all()

    return restaurants