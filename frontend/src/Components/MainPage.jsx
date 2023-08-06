import React,{useEffect, useState} from 'react';
import Transaction from './Transaction';
import axios from 'axios';
import '../App.css';

const Main = () => {
    const base_url = process.env.REACT_APP_BACKEND_BASE_URI;
    const [name,setName] = useState('');
    const [imgURI,setImgURI] = useState('');
    const [expense,setExpense] = useState('');
    const [description,setDescription] = useState('');
    const [datetime,setDatetime] = useState('');
    const [transactions,setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);

    useEffect(()=>{
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${base_url}/api/checkAuth`, { withCredentials: true });
                if (!response.data.isAuth) {
                    window.location.href = '/'; // Redirect to login page
                } else{
                    setName(response.data.name);
                    setImgURI(response.data.imgURL);
                }
            } catch (err) {
                console.log(err);
            }
        };
        checkAuth();
    },[base_url,name]);

    const clearTransactions = async() => {
        console.log(`function called`);
        try{
            const response = await axios.delete(`${base_url}/api/clearTransactions`,{withCredentials:true});
            if(response.data.success){
                setTransactions([]);
                setBalance(0);
            }
        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        let newBalance = 0;
        for (const transaction of transactions) {
            newBalance = newBalance + parseFloat(transaction.expense);
        }
        setBalance(newBalance);
    }, [transactions]);

    useEffect(()=>{
        const getTransactions = async(e) => {
            const url = `${base_url}/api/transactions`;
            const response = await axios.get(url,{withCredentials:true});
            const formattedTransactions = response.data.map(transaction => ({
                expense: transaction.expense,
                description: transaction.description,
                datetime: transaction.datetime
            }));
            console.log(formattedTransactions);
            setTransactions(formattedTransactions);
        }
        getTransactions();
    },[base_url])

    const addNewTransaction = async(e) => {
        e.preventDefault();
        const transactionInfo = {expense,description,datetime};
        try{
            const response = await axios.post(`${base_url}/api/transaction`,transactionInfo,{ withCredentials: true });
            console.log(response.data);
            setTransactions(prevTransactions => [...prevTransactions,{
                    expense: transactionInfo.expense,
                    description: transactionInfo.description,
                    datetime: transactionInfo.datetime
                }
            ]);
            setExpense('');
            setDescription('');
            setDatetime('');
        } catch(err){
            console.log(err);
        }
    }

    const logout = async() => {
        try{
            await axios.post(`${base_url}/logout`,{},{withCredentials:true});
            console.log(`Not logged in`);
            setTimeout(()=>{
                window.location.href="/";
            },3000)
        } catch(err){
            console.log(err);
        }
    }

    return (
        <>
        <main>
        <div className="container userInfo-div mt-4 mb-3">
            <h3 className="username-ack userInfo">Logged in as {name}</h3>
            <img className="img img-thumbnail img-fluid userImg" src={imgURI} alt="userimg" />
        </div>
        <div className="container logoutbtn-div mt-4">
            <button type="button-submit" className="btn btn-secondary" onClick={logout}>Logout</button>
        </div>
        <h1 className="balance">${balance}</h1>
            <form className="form-transaction" onSubmit={addNewTransaction}>
                <div className="container basic">
                    <input type="text" value={expense} onChange={(e)=>{setExpense(e.target.value)}} placeholder={'Money e.g. +150,-120 etc.'} required/>
                    <input type="datetime-local" value={datetime} onChange={(e)=>{
                        const newValue = e.target.value.slice(0, 16); //
                        setDatetime(newValue);
                        }}  placeholder="DD-MM-YYYY AM/PM" required/>
                </div>
                <div className="container description my-2">
                    <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder={'Description e.g. Bought PS4,Got stipend,etc.'} required/>
                </div>
                <div className="container">
                    <button type="submit" className=" button-submit my-2 p-1">Add new Transaction</button>
                    <button type="button" className="button-submit my-2 p-1" onClick={clearTransactions}>Remove All transaction</button>           
                </div>
            </form>
        </main>

        <section className="container">
            <Transaction transactions={transactions}/>
        </section>
        </>
    )
}

export default Main;