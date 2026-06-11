from fastapi import FastAPI, Depends
import uvicorn
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware


from database import get_db
from db_model import Cafe_Review
from db_schema import Cafe_Review_Pydantic
from typing import List


app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/cafe/get_review", response_model=list[Cafe_Review_Pydantic])
def get_review(db: Session = Depends(get_db)):

    response = db.query(Cafe_Review).all()
    return response

@app.get("/cafe/{cafe_id}",)
def give_review(cafe_id: int):
    return {"cafe_id": cafe_id}



if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
