import React, { useState,useEffect} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
    const [passwordSet,setPasswordSet] = useState(false);
    const [password,setPassword] = useState('');
    const {email} = useParams();

    useEffect(()=>{
        async function checkPasswordStatus() {
            try {
                const response = await axios.post('http://localhost:5000/api/checkPasswordStatus',{email});
                setPasswordSet(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        checkPasswordStatus();
    },[email])

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
            <h2>Email Registered Successfully!!</h2>
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
                <Link to="/" className="btn btn-primary">Go Back to login</Link>
            )}            
        </div>
    )
}

export default SuccessPage; 