import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const FormComponent = () => {
    const base_url = process.env.REACT_APP_BACKEND_BASE_URI;
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    async function handleSubmit(e){
        e.preventDefault(); 
        const userData = {email,password};
        const response = await axios.post(`${base_url}/api/login`,userData);
        if(response.status===200){
            console.log(response.data);
            setEmail('');
            setPassword('');
            window.location.href="http://localhost:3000/main";
        }
    }

    async function handleGoogleSignin(e){
        e.preventDefault();
        window.location.href = `${base_url}/auth/google`;
    }

    return (
        <>
            <article className="text-center my-5">
                <h2>Login Form</h2>
                <p><big>Login with your registered email only</big></p>
                <form method="post" onSubmit={handleSubmit}>
                    <div className="container text-center my-3">
                        <label htmlFor="mail">Email</label>
                        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div className="container text-center my-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </div>
                    <div className="container my-3">
                        <button className="btn btn-success">Login</button>
                    </div>
                    <div className="container my-3">
                        <button className="btn btn-primary" onClick={handleGoogleSignin}>Sign-up with Google</button>
                    </div>
                </form>
            </article>
        </>
    )
}

export default FormComponent;