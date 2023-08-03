import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
    const [email,setEmail] = useState('');
    
    async function handleSubmit(e){
        e.preventDefault(); 
        const userData = {email};
        const response = await axios.post('http://localhost:5000/api/login',userData);
        if(response.status===200){
            console.log(response);
            setEmail('');
        }
    }

    async function handleGoogleSignin(e){
        e.preventDefault();
        window.location.href = "http://localhost:5000/auth/google";
    }

    return (
        <React.Fragment>
            <article className="text-center my-5">
                <h2>Login Form</h2>
                <p><big>Login with your registered email only</big></p>
                <form method="post" onSubmit={handleSubmit}>
                    <div className="container text-center my-3">
                        <label htmlFor="mail">Email</label>
                        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div className="container my-3">
                        <button className="btn btn-success">Login</button>
                    </div>
                    <div className="container my-3">
                        <button className="btn btn-primary" onClick={handleGoogleSignin}>Sign-up with Google</button>
                    </div>
                </form>
            </article>
        </React.Fragment>
    )
}

export default FormComponent;