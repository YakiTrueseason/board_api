import './App.css';
import SignIn from './components/SignIn';
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/hello") //API通信
      .then((res) => res.json()) //apiから帰ってきたデータをjson形式に変換
      .then((data) => {
        setMessage(data.message); //messageを置き換え取り出す
      });
  }, []); //最初の一回実行
  //
  const sendPost = async () => { //投稿処理
    const res = await
      fetch("http://localhost:8000/posts", {
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
  }
  return (
    <div className="App" id='main'>
      <h1>{message}</h1>
      <input type="text"
        placeholder='タイトル'
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)}
      />
      <input type="text"
        placeholder='内容'
        value={content}
        onChange={(e) =>
          setContent(e.target.value)}
      />
      <br></br>
      <button onClick={sendPost}>送信</button>
      <SignIn />
    </div>
  );
}

export default App;
