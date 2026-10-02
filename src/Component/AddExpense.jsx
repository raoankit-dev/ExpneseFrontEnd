import React, { useState } from "react";
import "./AddExpense.css";

function AddExpense({ onClose }) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    description: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "Cash",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Expense:", formData);

    // Connect your FastAPI API here
  };

  return (
    <div className="expense-overlay">

      <div className="expense-card">

        {/* Header */}
        <div className="expense-header">

          <div>
            <h2>Add Expense</h2>

            <p>
              Record your expense and stay on track.
            </p>
          </div>

          <button
            className="expense-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* Form */}
        <form
          className="expense-form"
          onSubmit={handleSubmit}
        >

          {/* Amount */}
          <div className="expense-field">

            <label>AMOUNT *</label>

            <div className="expense-input amount-input">

              <div className="input-color yellow">
                ₹
              </div>

              <input
                type="number"
                name="amount"
                placeholder="Enter amount (e.g. 250)"
                value={formData.amount}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* Category */}
          <div className="expense-field">

            <label>CATEGORY *</label>

            <div className="expense-input">

              <div className="input-color yellow">
                🍴
              </div>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Food</option>
                <option>Transport</option>
                <option>Shopping</option>
                <option>Entertainment</option>
                <option>Bills</option>
                <option>Health</option>
                <option>Education</option>
                <option>Other</option>
              </select>

            </div>

          </div>


          


          {/* Date */}
          <div className="expense-field">

            <label>DATE *</label>

            <div className="expense-input">

              <div className="input-color blue">
                📅
              </div>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          


          {/* Buttons */}
          <div className="expense-actions">

            {/* <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button> */}

            <button
              type="submit"
              className="add-expense-btn"
            >
              Add Expense +
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddExpense;
