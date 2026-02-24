from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models
from database import SessionLocal, engine
import security

# Create tables in the database (if they don't exist)
models.Base.metadata.create_all(bind=engine)

#pydantic models
from pydantic import BaseModel,Field,EmailStr
class user(BaseModel):
    username:str=Field(...,maxlength=50,description="enter the username")
    email:EmailStr
    password:str=Field(...,minlength=8,description="enter the password")



app = FastAPI()

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get('/')
def home():
    return {"greeting":"welcome to PREDNSERVE"}

@app.post('/create_user')
def create_user(obj:user,db:session=Depends(get_db)):
    hashed=security.hash_password(obj.password)

    db_user=user(
        username=obj.username,
        email=obj.email,
        hashed_password=hashed
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.get("/restaurants/")
def read_restaurants(db: Session = Depends(get_db)):
    restaurants = db.query(models.Restaurant).all()
    return restaurants