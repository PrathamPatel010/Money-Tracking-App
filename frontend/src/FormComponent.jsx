import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    async function handleSubmit(e){
        e.preventDefault();
        const userData = {name,password,email};
        const response = await axios.post('http://localhost:5000/api/saveuser',userData);
        if(response.status===200){
            console.log(response);
            setEmail('');
            setName('');
            setPassword('');
        }
    }

    return (
        <>
            <article className="text-center my-5">
                <h2>Registration Form</h2>
                <form method="post" onSubmit={handleSubmit}>
                    <div className="container text-center my-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                    </div>
                    <div className="container text-center my-3">
                        <label htmlFor="mail">Email</label>
                        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div className="container text-center my-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </div>
                    <div className="container my-3">
                        <button className="btn btn-success">Submit</button>
                    </div>
                </form>
            </article>
        </>
    )
}

export default FormComponent;