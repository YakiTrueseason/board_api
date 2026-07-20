#DB接続
from sqlalchemy import create_engine,Column,Integer,String
from sqlalchemy.orm import declarative_base,sessionmaker

#どのDBに保存するか指定している
DATABASE_URL = "sqlite:///./test.db" 
#DBとの接続本体を作ってる
engine = create_engine(DATABASE_URL)
#保存処理
SessionLocal = sessionmaker(bind=engine)
#テーブルを作るための親クラス
Base = declarative_base() 
