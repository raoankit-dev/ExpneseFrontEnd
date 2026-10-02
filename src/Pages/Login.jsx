import React from 'react'
import "./CSS/Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { api, saveSession } from '../api'
import StatusMessage from '../Components/StatusMessage'
import loginBg from '../Assits/login-bg-v2.png'
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const submit = async (event) => { event.preventDefault(); setError(''); setLoading(true); try { const result = await api.login(form); saveSession(result); navigate('/dashboard'); } catch (err) { setError(err.message); } finally { setLoading(false); } };
  return (
    <div>
      <div className='login-container'>
        <div className='image-container'>
          <img className='login-bg-img' src={loginBg} alt="bg-img" />
        </div>
        <div className='login-form'>
          <h2 className='login-heading'>Login</h2>
          <form onSubmit={submit} className="login-form-fields">
            <input type="email" placeholder='Email' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input type="password" placeholder='Password' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <StatusMessage message={error} />
            <button className='login-btn' disabled={loading}>{loading ? 'Signing in…' : 'Login'}</button>
          </form>
          <p>If you dont have account-  <Link to="/register">Join Us</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
