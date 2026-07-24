//画面全体表示　UI
import '../App.css';
import React from 'react'
import SignIn from "../components/SignIn"
import PostList from '../components/PostList';
import EditModal from '../components/EditModal';
import PostForm from '../components/PostForm';
import { usePosts } from '../hooks/usePosts';
import ErrorMessage from '../components/ErrorMessage';


function Home  ()  {
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
    updatePost,

    loginUser,

    image,
    setImage,
    preview,
    setPreview,
    currentImage,
    setCurrentImage
} =usePosts();
    return (
<div className="min-h-screen  p-6" id='main'>      
        <h1 className='text-4xl font-bold text-blue-500'>掲示板API</h1>
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
        image={image}
        setImage={setImage}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
        preview={preview}
        setPreview={setPreview}
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
        loginUser={loginUser}
    />
    )}

      {/* モーダル */}
    <EditModal 
    isModalOpen={isModalOpen}
    title={title}
    setTitle={setTitle}
    content={content}
    setContent={setContent}
    updatePost={updatePost}
    setIsModalOpen={setIsModalOpen}
    image={image}
    setImage={setImage}
    currentImage={currentImage}
    setCurrentImage={setCurrentImage}
    preview={preview}
    setPreview={setPreview}
    />
        </div>
    )
}

export default Home
