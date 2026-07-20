//ログイン
import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    //トークン削除
    const handleLogout = () =>{
    localStorage.removeItem("token");
        //ログイン画面へ
        navigate("/login");
    };

return (
    <div className='bg-gray-100 min-h-screen flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded-lg p-8 w-96'>
            <h2 className='text-3xl fount-bold text-center text-blue-600 mb-6'>
                Logout
            </h2>
            <button 
                className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition' 
                onClick={handleLogout}>
                    ログアウト
            </button><br />
            <p className='text-center mt-6'>
                <Link
                    className='text-blue-500 hover:underline'
                    to="/login">
                        ログインについてはこちら
                </Link>
            </p>
        </div>
    </div>
)
}


export default Logout;