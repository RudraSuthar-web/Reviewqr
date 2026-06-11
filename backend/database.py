# database connection

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import psycopg





# DATABASE_URL="postgresql+psycopg://postgres.wcjmzmloppfnkglhdqgw:dhairya_76.@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres"
DATABASE_URL="postgresql+psycopg://postgres:rudra@localhost:5432/review_qr"


engine = create_engine(DATABASE_URL)


session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()