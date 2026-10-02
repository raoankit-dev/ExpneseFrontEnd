import React from 'react'
import "./Card.css"

const Card = () => {
  return (
    <div>
      <div className="card-main">
        <div className="card-logo">logo</div>
        <div className="card-details">
            <h4>Today Expense</h4>
            <p>₹ 24,530</p>
        </div>
      </div>
    </div>
  )
}

export default Card
