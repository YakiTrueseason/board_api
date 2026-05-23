//hooks分離　custom hook化

import { useEffect,useState } from "react";
import {
    getPostsApi,
    createPostsApi,
    deletePostsApi,
    updatePostsApi
}from '../services/Api';

export function usePosts(){
    // const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [posts,setPosts] = useState([]);
    const[editId,setEditId] = useState(null); //今どの投稿を編集しているか
    const [isModalOpen,setIsModalOpen] = useState(false); //モーダル状態

    // 投稿取得専用共通関数
    const getPosts = async ()=>{
        try{ //とりあえず実行
        const data = await getPostsApi(); //apiから帰ってきたデータをjson形式に変換
        setPosts(data); //データを取り出す 
        }catch(error){ //エラー捕獲
        console.log(error);
        }
    };
      useEffect(() => { // 初回実行
    getPosts(); //API取得
  }, []); //最初の一回実行

//投稿処理
const sendPost = async () => { 
    try{ //とりあえず実行
    await createPostsApi(title,content)
        getPosts();
        setTitle("");
        setContent("");
    }catch(error){ //エラー捕獲
    console.log(error); 
    }
};

    // //投稿一覧再取得
    // getPosts();
//     // .then((res)=>res.json()) //APIレスポンスをJSON変換
//     // .then((data)=>{ 
//     //   setPosts(data); //
//     // });

//     //入力リセット
//     setTitle("");
//     setContent("");
//   };

  //削除
const deletePost = async(id)=>{
    await deletePostsApi(id);
    //投稿一覧再取得 画面を最新化する為
    getPosts();
};

  //編集
const startEdit = (post) =>{
    // console.log(post);
    setEditId(post.id); //今この投稿編集中
    setTitle(post.title); 
    setContent(post.content); //内容表示
    setIsModalOpen(true); //モーダル表示
};
// 更新
const updatePost = async()=>{
    await updatePostsApi(
    editId,
    title,
    content
    );

    //再取得
    getPosts();
//     // .then((res)=>res.json()) //APIレスポンスをJSON変換
//     // .then((data)=>{
//     //   setPosts(data);
//     // });
//     //リセット
    setEditId(null); //編集モード終了　編集対処ID
    //文字入力
    setTitle("");
    setContent("");
    setIsModalOpen(false); //モーダル非表示
};
return{
    posts,
    title,
    content,
    editId,
    isModalOpen,

    setTitle,
    setContent,
    setIsModalOpen,

    sendPost,
    deletePost,
    startEdit,
    updatePost
};
}