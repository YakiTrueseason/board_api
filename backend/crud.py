#DB操作
from sqlalchemy import create_engine,Column,Integer,String
from sqlalchemy.orm import declarative_base,sessionmaker

# engine = create_engine("sqlite:///test.db")
DATABASE_URL = "sqlite:///./test.db" #どのDBに保存するか指定している

engine = create_engine(DATABASE_URL) #DBとの接続本体を作ってる
Base = declarative_base() #テーブルを作るための親クラス
#テーブル定義
class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer,primary_key=True)
    title = Column(String)
    content = Column(String)
#テーブル作成
Base.metadata.create_all(bind=engine) #定義したテーブルを実際のDBに作る　
#保存処理
sessionLocal = sessionmaker(bind=engine)
db = sessionLocal()

post = Post(title="テスト",content="内容")

db.add(post) #保存予約
db.commit() #DBに保存

