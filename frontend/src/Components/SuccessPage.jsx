import React, { useState,useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
    const base_url = process.env.REACT_APP_BACKEND_BASE_URI;
    const [passwordSet,setPasswordSet] = useState(false);
    const [password,setPassword] = useState('');
    const {email} = useParams();
    
    useEffect(()=>{
        const checkPassword = async() => {
            try{
                const response = await axios.post(`${base_url}/api/checkPasswordStatus`,{email});
                console.log(response.data);
                setPasswordSet(response.data.passwordSet);
            } catch(err){
                console.log(err);
            }
        };
        checkPassword();
    },[email,base_url]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const userData = {email,password};
        const response = await axios.post(`${base_url}/api/setPassword`,userData);
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