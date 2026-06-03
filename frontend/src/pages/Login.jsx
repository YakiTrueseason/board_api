//ログイン
import React,{ useState } from 'react'
import { loginApi } from '../services/Api'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();
    //
    const handleLogin = async()=>{
        try{
        const data = await loginApi(
        username,
        password
    );
    console.log(data);
    //ログイン成功
    if(data.token){
        //token保存
        localStorage.setItem(
            "token",
            data.token
        );
        //Homeへ移動
        navigate("/");
        console.log("保存成功");
    }
    }catch(error){
        console.log(error);
    };
}
return (
    <div>
        <input 
            // className='h-64 flex justify-center items-center text-center bg-gray-100'
            type='text'
            placeholder='ユーザ名'
            value={username}
            onChange={(e)=>
                    setUsername(e.target.value)
            }
        />
        <input 
            // className='h-64 flex justify-center items-center text-center bg-gray-100'
            type='password'
            placeholder='パスワード'
            value={password}
            onChange={(e)=>
                setPassword(e.target.value)
            }
        />
        <button className='shawdow bg-blue-400' onClick={handleLogin}>ログイン</button><br />
        <Link to="/signup">新規登録</Link>
    </div>
)
}

export default Login;