//フォーム　入力

import React from 'react'

function PostForm({
    title,
    setTitle,
    content,
    setContent,
    editId,
    updatePost,
    sendPost,
    image,
    setImage,
    preview,
    setPreview
}) {

return (
    <div>
        {/* 投稿入力フォーム */}
        {/* タイトル出力*/}
    <input className='border-teal-500 m-5 p-2 rounded' type="text"
        placeholder='タイトル'
        value={title}
        onChange={(e) =>
        setTitle(e.target.value)}
    />

    {/* 投稿内容出力*/}
    <input className='border p-2 w-80 rounded' type="text"
        placeholder='内容'
        value={content}
        onChange={(e) =>
        setContent(e.target.value)}
    />

    {/* 画像出力 */}
    <input 
        type="file" 
        accept="image/*" 
        onChange={(e)=>{
            const file = e.target.files[0];
            setImage(file);
            if(file){
            setPreview(URL.createObjectURL(file));
            }}
        }
    />
    
    {/* 画像プレビュー */}
    {preview &&(
        <img src={preview} alt="プレビュー" className='mt-4 rounded-lg w-64 border' />
    )}
    <br></br>

      {/* 現在編集中かどうか */}
    {editId !== null ? ( 
        <button className='bg-blue-400 px-5 py-1 mb-4  rounded hover:scale-105 transition' onClick={updatePost}>更新</button>
    ):(
        <button className='bg-blue-400 px-5 py-1 mb-4  rounded hover:scale-105 transition' onClick={sendPost}>送信</button>
    )}

    </div>
)
}

export default PostForm