import React from 'react'
import '../App.css';
import {v4 as uuidv4} from 'uuid';
import {format} from 'date-fns';
import axios from "axios";

const Transaction = ({setTransactions,transactions}) => {
    const base_url = process.env.REACT_APP_BACKEND_BASE_URI;
    const handleDelete = async(e) => {
        const response = await axios.delete(`${base_url}/api/transaction/${e.target.value}`);
        if (response.data.status!==200){
            return;
        }
        transactions = transactions.filter((transaction)=>transaction.id!==e.target.value);
        setTransactions(transactions);
    }


    return (
        <div className="transactions mt-3">
            {
                transactions.slice().reverse().map((transaction)=>{
                    const uniqueKey = uuidv4();
                    const transactionDate = new Date(transaction.datetime);
                    const formattedDate = format(transactionDate,'dd-MM-yyyy,hh:mm a');
                    return (
                    <div className="transaction" key={uniqueKey}>
                        <div className="left">
                            <div className="name">{transaction.description}</div>
                        </div>
                        <div className={'delete-btn-div'}>
                            <div className="right">
                                <div className={"price " + (transaction.expense<0?'red':'green')}>{transaction.expense}</div>
                                <div className="datetime">{formattedDate}</div>
                            </div>
                            <div>
                                <button onClick={handleDelete} value={transaction.id} className={'mx-2 my-2 btn btn-danger'}>Delete</button>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Transaction;