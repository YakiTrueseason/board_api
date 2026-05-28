//画面全体表示　UI
import '../App.css';
import React from 'react'
import TodoList from "../components/Todolist"
import SignIn from "../components/SignIn"
import PostList from '../components/PostList';
import EditModal from '../components/EditModal';
import PostForm from '../components/PostForm';
import { usePosts } from '../hooks/usePosts';
import ErrorMessage from '../components/ErrorMessage';
import { Link } from 'react-router-dom';


function Home  ()  {
    // const { todos } = useTodos();
const{
    posts,
    title,
    content,
    editId,
    isModalOpen,
    loading,
    error,

    setTitle,
    setContent,
    setIsModalOpen,

    sendPost,
    deletePost,
    startEdit,
    updatePost
} =usePosts();
    return (
<div className="min-h-screen  p-6" id='main'>      
        <h1 className='text-4xl font-bold text-blue-500'>掲示板API</h1>
        <Link to="/login">
        ログイン
            </Link>
            <TodoList />
            <SignIn />
               {/* UI コンポーネント */}
      {/* <Home /> */}
    {/* タイトル・投稿内容・編集出力*/}
    <PostForm 
        editId={editId}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        updatePost={updatePost}
        sendPost={sendPost}
    />

    {/* タイトルと内容表示とローディング とエラー*/}
    {loading ?(
        <p className='text-center'>読み込み中．．．</p>
    ):error ?(
        <ErrorMessage message={error}/>
    ):(
    <PostList 
        posts={posts}
        deletePost={deletePost}
        startEdit={startEdit}
    />
    )}

      {/* モーダル */}
    <EditModal 
    isModalOpen={isModalOpen}
    title={title}
    setTitle={setTitle}
    setContent={setContent}
    content={content}
    updatePost={updatePost}
    setIsModalOpen={setIsModalOpen}
    />
        </div>
    )
}

export default Home
