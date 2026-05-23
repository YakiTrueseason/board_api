//フォーム

import React from 'react'

function PostForm({title,setTitle,content,setContent,editId,updatePost,sendPost}) {

return (
    <div>
        {/* 投稿入力フォーム */}
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

    </div>
)
}

export default PostForm