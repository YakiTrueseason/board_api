//モーダル　編集

import React from 'react'

function EditModal({isModalOpen,title,setTitle,content,setContent,updatePost,setIsModalOpen}) {
return (
    <div>
        {/* モーダル 専用*/}
    {isModalOpen && (
        <div className='modal-overlay'>
        <div className='modal'>
            <h2>投稿編集</h2>
            <input type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text"
                value={content}
                onChange={(e)=>setContent(e.target.value)}/>
            <button onClick={updatePost}>
            更新
            </button>
            <button onClick={()=>setIsModalOpen(false)}>
            閉じる
            </button>
        </div>
        </div>
    )}
    </div>
)
}

export default EditModal