import React, { useState } from 'react';
import axios from 'axios';
import SpinnerLoader from "./SpinnerLoader";

import '../App.css';
const FormComponent = () => {
    const base_url = process.env.REACT_APP_BACKEND_BASE_URI;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acknowledgment, setAcknowldgment] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setShowLoader(true);
        const userData = { email, password };
        const response = await axios.post(`${base_url}/api/login`, userData, { withCredentials: true });
        setShowLoader(false);
        if (response.data.success === true) {
            document.getElementById('ack-div').style.color='green';
            setAcknowldgment('Success!! Please wait while you are being redirected');
            console.log(response.data);
            setEmail('');
            setPassword('');
            window.location.href = "/main";
            return;
        }
        if (response.data) {
            setPassword('');
            console.log(response.data);
            document.getElementById('ack-div').style.color='red';
            setAcknowldgment(response.data.error);
        }
    }

    async function handleGoogleSignin(e) {
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
                        <input type="email" name="email" value={email} placeholder="Email" onChange={(e) => { setAcknowldgment(''); setEmail(e.target.value); }} autoComplete="on" required />
                    </div>
                    <div className="container my-3">
                        <input type="password" value={password} placeholder="password" onChange={(e) => { setAcknowldgment(''); setPassword(e.target.value); }} autoComplete="off" required />
                    </div>
                    {
                        showLoader ? (<SpinnerLoader />) : (
                            <div className="container mt-3">
                                <button className="btn btn-success">Login</button>
                            </div>
                        )
                    }
                    <div className={'my-3'}>
                        <h6>Test User: Email:ppratham812@gmail.com & password:asd</h6>
                    </div>

                    <div id={'ack-div'} className="container mb-4">
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