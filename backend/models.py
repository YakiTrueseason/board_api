#DBテーブル定義
from sqlalchemy import Column,Integer,String,DateTime
from database import Base
from datetime import datetime,UTC
# パス
class DBPost(Base):
    __tablename__ = "posts"

    id = Column(Integer,primary_key=True)
    title = Column(String)
    content = Column(String)
    username = Column(String)
# 画像
    image_path = Column(String,nullable=True)
# 日時保存
    created_at = Column(
        DateTime,
        default=lambda: datetime.now(UTC)
    )
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(UTC),
        onupdate=lambda: datetime.now(UTC)
    )

class User(Base):
    __tablename__ = "users"

    id = Column(Integer,primary_key=True)
    username = Column(String,unique=True)
    password = Column(String)