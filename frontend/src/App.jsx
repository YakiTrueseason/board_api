import './App.css';
import SignIn from './components/SignIn';
import { useEffect, useState } from "react";

function App() {
  // const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts,setPosts] = useState([]);
  const[editId,setEditId] = useState(null); //今どの投稿を編集しているか

  useEffect(() => {
    fetch("http://localhost:8000/posts") //API通信
      .then((res) => res.json()) //apiから帰ってきたデータをjson形式に変換
      .then((data) => {
        setPosts(data); //データを取り出す
      });
  }, []); //最初の一回実行
  const sendPost = async () => { //投稿処理
    const res = await fetch("http://localhost:8000/posts", {
        method: "POST", //投稿作成
        headers: {
          "Content-Type": "application/json", //json形式で送ります
        },
        body: JSON.stringify({ //jsをJSON変換し、データを送る本体
          title: title,
          content: content,
        }),
      });
      const data = await res.json(); //JSON変換
      console.log(data);
    //投稿一覧再取得
    fetch("http://localhost:8000/posts")
    .then((res)=>res.json()) //APIレスポンスをJSON変換
    .then((data)=>{ 
      setPosts(data); //React状態更新
    });
    //入力リセット
    setTitle("");
    setContent("");
  };
  //削除
  const deletePost = async(id)=>{
    await fetch(`http://localhost:8000/posts/${id}`,{
      method:"DELETE",
    });
    //投稿一覧再取得 画面を最新化する為
    fetch("http://localhost:8000/posts") 
    .then((res)=>res.json())
    .then((data)=>{
      setPosts(data);
    });
  };
  //編集
  const startEdit = (post) =>{
    // console.log(post);
    setEditId(post.id); //今この投稿編集中
    setTitle(post.title); 
    setContent(post.content); //内容表示
  };

  const updatePost = async()=>{
    await fetch(`http://localhost:8000/posts/${editId}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json", //jsをJSON変換し、データを送る本体
      },
      body:JSON.stringify({ //jsをJSON変換し、データを送る本体
        title,
        content,
      }),
    });
    //再取得
    fetch("http://localhost:8000/posts")
    .then((res)=>res.json()) //APIレスポンスをJSON変換
    .then((data)=>{
      setPosts(data);
    });
    //リセット
    setEditId(null); //編集モード終了　編集対処ID
    //文字入力
    setTitle("");
    setContent("");
  }
  return (
    <div className="App" id='main'>
      {/* <h1>{message}</h1> */}
      <h1>投稿一覧</h1>
      {/* タイトル出力*/}
      <input type="text"
        placeholder='タイトル'
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)}
      />
      {/* 投稿内容出力*/}
      <input type="text"
        placeholder='内容'
        value={content}
        onChange={(e) =>
          setContent(e.target.value)}
      />
      <br></br>
      {/* 現在編集中かどうか */}
      {editId !== null ? ( 
        <button onClick={updatePost}>更新</button>
      ):(
              <button onClick={sendPost}>送信</button>
      )}
      <SignIn />
      {/* タイトルと内容表示 */}
      {posts.map((post)=>(
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        {/* 削除ボタン */}
          <button onClick={() => deletePost(post.id)}>
            削除
          </button>
          <button onClick={()=> startEdit(post)}>
            編集
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
