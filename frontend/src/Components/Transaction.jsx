import React from 'react'
import '../App.css';
const Transaction = () => {
    return (
        <div className="transactions mt-3">
            <div className="transaction">
                <div className="left">
                    <div className="name">Ordered Cheese Pizza</div>
                </div>
                <div className="right">
                    <div className="price red">-$10</div>
                    <div className="datetime">05-08-2023</div>
                </div>
            </div>
            <div className="transaction">
                <div className="left">
                    <div className="name">Received Payment for application development</div>
                </div>
                <div className="right">
                    <div className="price green">+$800</div>
                    <div className="datetime">02-08-2023</div>
                </div>
            </div>
            <div className="transaction">
                <div className="left">
                    <div className="name">Went on a date</div>
                </div>
                <div className="right">
                    <div className="price red">-$100</div>
                    <div className="datetime">01-08-2023</div>
                </div>
            </div>
        </div>
    )
}

export default Transaction;