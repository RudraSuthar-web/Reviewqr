from pydantic import BaseModel

class Cafe_Review_Pydantic(BaseModel):
    review1: str
    review2: str
    review3: str
    review4: str
    review5: str

    class Config:
        from_attributes = True