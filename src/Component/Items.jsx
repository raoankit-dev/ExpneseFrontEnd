import './Items.css'

const Items = ({ expense, onDelete, onEdit }) => {
  if (!expense) return null;
  return (
    <div>
      <div className='items'>
        <p title={expense.title}>{expense.title}</p>
        <p>{expense.category}</p>
        <p>{new Date(expense.expense_date).toLocaleDateString('en-IN')}</p>
        <p>₹ {Number(expense.amount).toLocaleString('en-IN')}</p>
        {onEdit && <button className="edit-expense" onClick={() => onEdit(expense)} aria-label={`Edit ${expense.title}`}>Edit</button>}
        {onDelete && <button className="delete-expense" onClick={() => onDelete(expense.id)} aria-label={`Delete ${expense.title}`}>×</button>}
      </div>
    </div>
  )
}

export default Items
