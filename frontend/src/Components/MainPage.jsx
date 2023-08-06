import React,{useEffect, useState} from 'react'
import Transaction from './Transaction';
import axios from 'axios';
import '../App.css'

const Main = () => {
    const base_url = process.env.REACT_APP_BACKEND_BASE_URI;
    const [balance,setBalance] = useState(0);
    const [expense,setExpense] = useState('');
    const [description,setDescription] = useState('');
    const [datetime,setDatetime] = useState('');
    const [transactions,setTransactions] = useState([]);

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

    return (
        <>
        <main>
        <h1 className="balance">${balance}</h1>
            <form className="form-transaction" onSubmit={addNewTransaction}>
                <div className="container basic">
                    <input type="text" value={expense} onChange={(e)=>{setExpense(e.target.value)}} placeholder={'+120'} required/>
                    <input type="datetime-local" value={datetime} onChange={(e)=>{
                        const newValue = e.target.value.slice(0, 16); //
                        setDatetime(newValue);
                        }} required/>
                </div>
                <div className="container description my-2">
                    <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder={'Cheese Sandwich'} required/>
                </div>
                <div className="container">
                    <button type="submit" className=" button-submit my-2 p-1">Add new Transaction</button>
                    {transactions.length}
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