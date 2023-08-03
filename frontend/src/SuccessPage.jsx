import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return(
        <div>
            <h2>Registration Successful!!</h2>
            <Link to="/" className="btn btn-primary">Go Back to login</Link>
        </div>
    )
}

export default SuccessPage; 