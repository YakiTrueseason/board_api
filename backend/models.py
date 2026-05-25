#DBテーブル定義
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column,Integer,String

Base = declarative_base()

class DBPost(Base):
    __tablename__ = "posts"

    id = Column(Integer,primary_key=True)
    title = Column(String,unique=True)
    content = Column(String)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer,primary_key=True)
    username = Column(String,unique=True)
    password = Column(String)