import React,{useState} from 'react'
import Transaction from './Transaction';
import axios from 'axios';
import '../App.css'

const Main = () => {
    const base_url = process.env.REACT_APP_BACKEND_BASE_URI;
    const [expense,setExpense] = useState('');
    const [description,setDescription] = useState('');
    const [datetime,setDatetime] = useState('');
    
    const addNewTransaction = async(e) => {
        e.preventDefault();
        const transactionInfo = {expense,description,datetime};
        try{
            const response = await axios.post(`${base_url}/api/transaction`,transactionInfo);
            console.log(response.data);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <>
        <main>
        <h1 className="balance">$400</h1>
            <form className="form-transaction" onSubmit={addNewTransaction}>
                <div className="container basic">
                    <input type="text" value={expense} onChange={(e)=>{setExpense(e.target.value)}} placeholder={'+120'} required/>
                    <input type="datetime-local" value={datetime} onChange={(e)=>{setDatetime(e.target.value)}} required/>
                </div>
                <div className="container description my-2">
                    <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder={'Cheese Sandwich'} required/>
                </div>
                <div className="container">
                    <button type="submit" className=" button-submit my-2 p-1">Add new Transaction</button>
                </div>
            </form>
        </main>

        <section className="container">
            <Transaction/>
        </section>
        </>
    )
}

export default Main;