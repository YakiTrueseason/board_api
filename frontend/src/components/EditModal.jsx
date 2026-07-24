//モーダル　編集

import React from 'react'
import { API_URL } from '../services/Api';

function EditModal({
    isModalOpen,
    title,
    setTitle,
    content,
    setContent,
    setImage,
    setPreview,
    preview,
    updatePost,
    setIsModalOpen
}) {
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
        <img src={
            preview
                ?preview.startsWith("blob:")
                    ? preview
                    :`${API_URL}${preview}`
                :""
        } alt="プレビュー" className='mt-4 rounded-lg w-64 border' />
        )}

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