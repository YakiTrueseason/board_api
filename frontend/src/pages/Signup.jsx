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
    <div>
        <input 
            type='text'
            placeholder='ユーザ名'
            value={username}
            onChange={(e)=>
                    setUsername(e.target.value)
            }
        />
        <input 
            type='password'
            placeholder='パスワード'
            value={password}
            onChange={(e)=>
                setPassword(e.target.value)
            }
        />
        <button className='shadow bg-blue-400' onClick={handleSignup}>登録</button><br />
        <Link to="/login">ログイン</Link>
    </div>
)
}

export default Signup;