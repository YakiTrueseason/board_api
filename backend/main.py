#fastAPI
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware #reactからアクセス許可する機能

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
posts = []#配列を投稿で保存　DBを使う
current_id = 0 #ID管理用

#データ型
class PostCreate(BaseModel):
    title:str
    content:str
class Post(BaseModel):#自動でJSON変換 IDはサーバー側で作る
    id: int
    title: str
    content: str

#一覧取得
@app.get("/posts") #GET/posts(配列)　全投稿を返す
def get_posts():
    return posts

#投稿成功
@app.post("/posts")#JSONを受け取りPOST型に変換、配列に追加し返す
def create_post(post: PostCreate):
    global current_id

    new_post = Post(
        id=current_id,
        title=post.title,
        content=post.content
    )

    posts.append(new_post)
    current_id += 1
    return new_post#削除してもズレない

#更新機能
@app.put("/posts/{id}")
def update_post(id: int,post: Post): #どの投稿をどんな内容に変えるかを受け取る
    if id < len(posts): #そのIDが存在するか確認
        posts[id] = post
        return post #更新後のデータをそのまま返す
    return {"error":"存在しない"}
#投稿削除
@app.delete("/posts/{id}")
def delete_post(id: int):
    for i,post in enumerate(posts):
        if post.id == id:#配列のチェック　指定番号削除
            posts.pop(i)
            return{"message":"削除成功"}#IDを探して削除出来るようにする

    return{"error":"存在しない"}#範囲外ならエラー

@app.get("/debug")
def debug_db():
    return posts