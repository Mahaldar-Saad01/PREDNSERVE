from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import DeclarativeBase
class Base(DeclarativeBase):
    pass
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password= Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

class Restaurant(Base):
    __tablename__ = "restaurants"
    res_id = Column(Integer, primary_key=True, index=True)
    res_name = Column(String(100), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(TIMESTAMP, server_default=func.now())
# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String(100), unique=True)
#     email = Column(String(100), unique=True)
#     password = Column(String)

#     restaurants = relationship("Restaurant", back_populates="owner")


# class Restaurant(Base):
#     __tablename__ = "restaurants"

#     res_id = Column(Integer, primary_key=True, index=True)
#     res_name = Column(String(100), nullable=False)
#     owner_id = Column(Integer, ForeignKey("users.id"))

#     created_at = Column(TIMESTAMP, server_default=func.now())

#     owner = relationship("User", back_populates="restaurants")