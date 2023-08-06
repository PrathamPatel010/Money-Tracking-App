import React from 'react'
import '../App.css';
import {v4 as uuidv4} from 'uuid';
import {format} from 'date-fns';
const Transaction = ({transactions}) => {
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
                        <div className="right">
                            <div className={"price " + (transaction.expense<0?'red':'green')}>{transaction.expense}</div>
                            <div className="datetime">{formattedDate}</div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Transaction;