import React,{useState} from 'react'
import Transaction from './Transaction';
import '../App.css'
const Main = () => {
    const [expense,setExpense] = useState('');
    const [description,setDescription] = useState('');
    const [datetime,setDatetime] = useState('');
    
    const addNewTransaction = (e) => {
        e.preventDefault();
        const base_url = process.env.REACT_APP_BACKEND_BASE_URI;
        console.log(base_url);
    }

    return (
        <>
        <main>
        <h1 className="balance">$400</h1>
            <form className="form-transaction" onSubmit={addNewTransaction}>
                <div className="container basic">
                    <input type="text" value={expense} onChange={(e)=>{setExpense(e.target.value)}} placeholder={'+120'} />
                    <input type="datetime-local" value={datetime} onChange={(e)=>{setDatetime(e.target.value)}}/>
                </div>
                <div className="container description my-2">
                    <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder={'Cheese Sandwich'} />
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