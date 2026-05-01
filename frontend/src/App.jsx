import './App.css';
import SignIn from './components/SignIn';
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/hello") //API通信
      .then((res) => res.json()) //apiから帰ってきたデータをjson形式に変換
      .then((data) => {
        setMessage(data.message); //messageを置き換え取り出す
      });
  }, []); //最初の一回実行
  return (
    <div className="App" id='main'>
      <h5>2ch風掲示板API-卒業制作</h5>
      <h1>{message}</h1>
      <SignIn />
    </div>
  );
}

export default App;
