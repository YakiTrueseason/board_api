#fastAPI処理
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware #reactからアクセス許可する機能[]
from database import SessionLocal,DBPost
from schemas import (UserCreate,PostCreate)
from models import User,DBPost

app = FastAPI() #appに機能追加していく

#Reactからアクセス許可
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    #ReactURLのURL
    allow_credentials=True, #ログイン情報・Cookie許可
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/hello")
def hello():
    return{"message":"Hello from FASTAPI"}

#仮DB
# posts = []#配列を投稿で保存　DBを使う
# current_id = 0 #ID管理用

#データ型
class PostCreate(BaseModel):
    title:str
    content:str
class PostResponse(BaseModel):#自動でJSON変換 IDはサーバー側で作る
    id: int
    title: str
    content: str

#一覧取得
@app.get("/posts") #GET/posts(配列)　全投稿を返す
def get_posts():
    db = SessionLocal()
    posts = db.query(DBPost).all()
    db.close()
    return posts

#　ユーザー作成
@app.post("/signup")
def signup(user:UserCreate):
    db = SessionLocal()
    new_user = User(
        username=user.username,
        password=user.password
    )
    db.add(new_user)
    db.commit()
    db.close()

    return{"message":"作成成功"}

#ログイン　認証
@app.post("/login")
def login(user:UserCreate):
    db=SessionLocal()
    db_user = db.query(User).filter(
        User.username == user.username
    ).first()
    if not db_user:
        return{"error":"存在しない"}
    if db_user.password != user.password:
        return{"error":"パスワードが違う"}
    return{
        "token":"sample-token"
    }

#投稿成功
@app.post("/posts")#JSONを受け取りPOST型に変換、配列に追加し返す
def create_post(post: PostCreate):
    # global current_id
    db = SessionLocal()

    new_post = DBPost(
        title=post.title,
        content=post.content
    )

    # posts.append(new_post)
    db.add(new_post)#保存予約
    db.commit() #DBに保存
    db.refresh(new_post) #DB最新状態を取得
    db.close() #DB接続終了
    # current_id += 1
    return new_post#削除してもズレない

#更新機能
@app.put("/posts/{id}") 
def update_post(id: int,post: PostCreate): #どの投稿をどんな内容に変えるかを受け取る
    db = SessionLocal() #SQLite接続開始
    #DB検索
    db_post = db.query(DBPost).filter(DBPost.id == id).first()
    #存在確認
    if not db_post:
        db.close()
        return{"error":"存在しない"}
    #更新　pythonオブジェクト変更
    db_post.title = post.title
    db_post.content = post.content
    #DB保存　更新確定
    db.commit()
    #最新状態取得
    db.refresh(db_post)
    #DB接続終了
    db.close()
    return db_post
    # if id < len(posts): #そのIDが存在するか確認
        # posts[id] = post
        # return post #更新後のデータをそのまま返す
    # return {"error":"存在しない"}
#投稿削除
@app.delete("/posts/{id}")
def delete_post(id: int):
    db = SessionLocal() #SQLite接続開始
    #テーブル操作を開始しidを一致検索、最初の1件を取得する
    db_post = db.query(DBPost).filter(DBPost.id == id).first()
    #該当データ無いか？
    if not db_post:
        db.close()
        return{"error":"存在しない"}
    #削除予約
    db.delete(db_post)
    db.commit()
    db.close()

    return{"message" : "削除成功"}
    # for i,post in enumerate(posts):
        # if post.id == id:#配列のチェック　指定番号削除
            # posts.pop(i)
            # return{"message":"削除成功"}#IDを探して削除出来るようにする
    # return{"error":"存在しない"}#範囲外ならエラー

# デバック　開発確認用API
@app.get("/debug")
def debug_db():
    db = SessionLocal()
    #全件取得
    posts = db.query(DBPost).all()
    db.close()
    return posts