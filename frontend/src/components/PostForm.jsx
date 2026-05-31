//フォーム　入力

import React from 'react'

function PostForm({title,setTitle,content,setContent,editId,updatePost,sendPost}) {

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
    <br></br>

      {/* 現在編集中かどうか */}
    {editId !== null ? ( 
        <button className='bg-blue-400 m-2 py-1 rounded' onClick={updatePost}>更新</button>
    ):(
        <button className='bg-blue-400 px-5 py-1 mb-4  rounded' onClick={sendPost}>送信</button>
    )}

    </div>
)
}

export default PostForm