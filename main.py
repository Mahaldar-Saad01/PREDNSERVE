from fastapi import FastAPI, Depends,HTTPException
from sqlalchemy.orm import Session
from models import User,Restaurant,Base
from database import SessionLocal, engine
import auth
from database import get_db
from datetime import datetime
from auth import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from routers import ml


# Create tables in the database (if they don't exist)
Base.metadata.create_all(bind=engine)

#pydantic models
from pydantic import BaseModel,Field,EmailStr
class user_(BaseModel):
    username:str=Field(...,maxlength=50,description="enter the username")
    email:EmailStr
    password:str=Field(...,minlength=4,maxlength=20,description="enter the password")

class LoginRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True

class RestaurantCreate(BaseModel):
    res_name: str

class RestaurantResponse(BaseModel):
    res_id: int
    res_name: str
    owner_id: int
    created_at: datetime

    class Config:
        orm_mode = True

app = FastAPI()

app.include_router(ml.router)

#api end points
@app.get('/')
def home():
    return {"greeting":"welcome to PREDNSERVE"}

@app.post("/home/register_user", response_model=UserResponse)
def create_user(obj:user_,db:Session=Depends(get_db)):
    hashed=auth.hash_password(obj.password)

    existing = db.query(User).filter(User.email == obj.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    db_user=User(
        username=obj.username,
        email=obj.email,
        hashed_password=hashed
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

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

@app.get("/restaurants/")
def read_restaurants(db: Session = Depends(get_db)):
    restaurants = db.query(Restaurant).all()
    return restaurants