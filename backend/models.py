#DBテーブル定義
from sqlalchemy import Column,Integer,String
from database import Base

class DBPost(Base):
    __tablename__ = "posts"

    id = Column(Integer,primary_key=True)
    title = Column(String)
    content = Column(String)
    username = Column(String)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer,primary_key=True)
    username = Column(String,unique=True)
    password = Column(String)