//ログイン
import React,{ useState } from 'react'
import { signupApi } from '../services/Api'
import { Link } from 'react-router-dom';

function Signup() {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    //新規登録
    const handleSignup = async()=>{
        try{
        const data = await signupApi(
        username,
        password
    );
    console.log(data);
    alert("登録成功");
    }catch(error){
        console.log(error);
    };
}
return (
    <div className='bg-gray-100 min-h-screen flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded-lg p-8 w-96'>
            <h2 className='text-3xl fount-bold text-center text-blue-600 mb-6'>
                Signup
            </h2>
            <input
                className='w-full border rounded-md px-3 py-2 mb-4 focus:outline-none foucus:ring-2 foucus:ring-blue-400'
                type='text'
                placeholder='ユーザ名'
                value={username}
                onChange={(e)=>
                        setUsername(e.target.value)
                }
            />
            <input
                className='w-full border rounded-md px-3 py-2 mb-4 focus:outline-none foucus:ring-2 foucus:ring-blue-400'
                type='password'
                placeholder='パスワード'
                value={password}
                onChange={(e)=>
                    setPassword(e.target.value)
                }
            />
            <button 
                className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition'
                onClick={handleSignup}>
                    登録
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

export default Signup;