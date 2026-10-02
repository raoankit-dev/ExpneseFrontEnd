import "./Card.css"

const Card = ({ label, value, accent = 'yellow', icon = '₹', detail, currency = true }) => {
  return (
    <div>
      <div className={`card-main ${accent}`}>
        <div className={`card-logo ${accent}`}>{icon}</div>
        <div className="card-details">
            <h4>{label}</h4>
            <p>{currency ? '₹ ' : ''}{Number(value || 0).toLocaleString('en-IN')}</p>
            {detail && <small className="card-detail">{detail}</small>}
        </div>
      </div>
    </div>
  )
}

export default Card
