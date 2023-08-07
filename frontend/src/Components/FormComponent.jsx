import React, { useState} from 'react';
import axios from 'axios';
import '../App.css';
const FormComponent = () => {
    const base_url = process.env.REACT_APP_BACKEND_BASE_URI;
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [acknowledgment,setAcknowldgment] = useState('');

    async function handleSubmit(e){
        e.preventDefault(); 
        const userData = {email,password};
        const response = await axios.post(`${base_url}/api/login`,userData,{ withCredentials: true });
        if(response.data.success===true){
            setAcknowldgment('Success!! Please wait while you are being directed');
            console.log(response.data);
            setEmail('');
            setPassword('');
            setTimeout(()=>{
                window.location.href = "/main";
            },2000);
            return;
        }
        if(response.data){
            setEmail('');
            setPassword('');
            console.log(response.data);
            setAcknowldgment(response.data.error);
        }
    }

    async function handleGoogleSignin(e){
        e.preventDefault();
        window.location.href = `${base_url}/auth/google`;
    }

    return (
        <>
            <article className="container my-5">
                <div className="login-header">
                    <h2>Login</h2>
                    <big>Login with your registered email only</big>
                </div>
                <form method="post" onSubmit={handleSubmit} className="container loginform-div">
                    <div className="container my-3">
                        <input type="email" value={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div className="container my-3">
                        <input type="password" value={password} placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </div>
                    <div className="container mt-3">
                        <button className="btn btn-success">Login</button>
                    </div>
                    <div className="container mb-4">
                        {acknowledgment}
                    </div>
                    <div className="mt-md-4 mt-3">
                        Haven't signed up yet?
                    </div>
                    <div className="container my-3">
                        <button className="btn btn-primary" onClick={handleGoogleSignin}>Sign-up with Google <img className="img img-fluid icon-google" src="/google-icon.png" alt="googleicon" /> </button>
                    </div>
                </form>
            </article>
            <footer className="blue-bg text-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 my-3">
                            <h4>Made with ❤ by Pratham</h4>
                        </div>
                        <div className="col-12 my-3">
                            <h5>Let's Connect On Socials</h5>
                        </div>
                        <div className="row justify-content-center my-2">
                            <div className="col-12 col-md-4 text-center">
                                <a href="https://github.com/PrathamPatel010 "><i className="fab fa-2x fa-github mx-2 mx-md-3"></i></a>
                                <a href="https://twitter.com/Prathamtwts "><i className="fab fa-2x fa-twitter mx-2 mx-md-3"></i></a>
                                <a href="https://www.linkedin.com/in/pratham-patel-08865821b "><i className="fab fa-2x fa-linkedin mx-2 mx-md-3"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 my-2">
                    <small>©2023 Pratham Patel</small>
                </div>
            </footer>
        </>
    )
}

export default FormComponent;