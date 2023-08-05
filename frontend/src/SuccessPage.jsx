import React, { useState,useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
    const [passwordSet,setPasswordSet] = useState(false);
    const [password,setPassword] = useState('');
    const {email} = useParams();
    
    useEffect(()=>{
        const checkPassword = async() => {
            try{
                const response = await axios.post('http://localhost:5000/api/checkPasswordStatus',{email});
                console.log(response.data);
                setPasswordSet(response.data.passwordSet);
            } catch(err){
                console.log(err);
            }
        };
        checkPassword();
    },[email]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const userData = {email,password};
        const response = await axios.post('http://localhost:5000/api/setPassword',userData);
        console.log(response.data);
        setPasswordSet(true);
        setPassword('');
    }
    return(
        <div className="text-center mt-5">
            <h2>Email Registered!!</h2>
            { !passwordSet && (
                <>
            <h3>Enter password for login</h3>
            <form onSubmit={handleSubmit}>
            <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
            <button type="submit" className="btn btn-primary">Setup</button>
            </form>
                </>
            )}
            { passwordSet && (
                <>
                <h3>Password is already set</h3>
                <Link to="/" className="btn btn-primary">Go Back to login</Link>
                </>
            )}            
        </div>
    )
}

export default SuccessPage; 