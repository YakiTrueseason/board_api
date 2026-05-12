#接続
#DB操作
from sqlalchemy import create_engine,Column,Integer,String
from sqlalchemy.orm import declarative_base,sessionmaker

# engine = create_engine("sqlite:///test.db")

#どのDBに保存するか指定している
DATABASE_URL = "sqlite:///./test.db" 
#DBとの接続本体を作ってる
engine = create_engine(DATABASE_URL)
#保存処理
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base() #テーブルを作るための親クラス
#テーブル定義
class DBPost(Base):
    __tablename__ = "posts"

    id = Column(Integer,primary_key=True)
    title = Column(String)
    content = Column(String)
#テーブル作成
Base.metadata.create_all(bind=engine) #定義したテーブルを実際のDBに作る　

# db = SessionLocal()

# post = DBPost(title="テスト",content="内容")

# db.add(post) 
# db.commit() 