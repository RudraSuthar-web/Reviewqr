import sqlalchemy.ext.declarative as declarative 
from database import engine
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

Base = declarative.declarative_base()   


class Cafe_Review(Base):
    __tablename__ = "cafe_review_vadapav"

    id = Column(Integer, primary_key=True, index=True)
    prompt = Column(String)
    review1 = Column(String, nullable=False)
    review2 = Column(String, nullable=False)
    review3 = Column(String, nullable=False)
    review4 = Column(String, nullable=False)
    review5 = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now)


Base.metadata.create_all(bind=engine)