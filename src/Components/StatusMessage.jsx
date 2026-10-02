const StatusMessage = ({ message, type = 'error' }) => message ? (
  <p className={`status-message ${type}`} role="alert">{message}</p>
) : null;

export default StatusMessage;
