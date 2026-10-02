import { useState } from "react";
import "./AddExpense.css";

function AddExpense({ onClose, onSaved, expense = null }) {
  const [formData, setFormData] = useState({
    title: expense?.title || "",
    amount: expense?.amount ?? "",
    category: expense?.category || "Food",
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

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSaving(true);
    try { await onSaved({ title: formData.title, amount: Number(formData.amount), category: formData.category }); onClose(); }
    catch (err) { setError(err.message); } finally { setSaving(false); }
  };

  return (
    <div className="expense-overlay">

      <div className="expense-card">

        {/* Header */}
        <div className="expense-header">

          <div>
            <h2>{expense ? 'Update Expense' : 'Add Expense'}</h2>

            <p>
              {expense ? 'Correct the details and save your changes.' : 'Record your expense and stay on track.'}
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
            <label>ITEM *</label>
            <div className="expense-input"><input type="text" name="title" placeholder="What did you spend on?" value={formData.title} onChange={handleChange} minLength="2" maxLength="50" required /></div>
          </div>
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
              {saving ? 'Saving…' : expense ? 'Update Expense +' : 'Add Expense +'}
            </button>
            {error && <p className="status-message error">{error}</p>}

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddExpense;
