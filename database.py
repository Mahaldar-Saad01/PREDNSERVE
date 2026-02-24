from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine import URL
from models import Base

# Format: mysql+pymysql://user:password@host:port/database_name
SQLALCHEMY_DATABASE_URL =URL.create(
    drivername="mysql+pymysql",
    username="root",
    password="Mahaldar@saad1",
    host="localhost",
    port="3306",
    database="greenify"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
