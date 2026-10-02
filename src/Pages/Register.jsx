import React from 'react'
import "./CSS/Register.css"
import { Link, useNavigate } from 'react-router-dom'
import { api, saveSession } from '../api'
import StatusMessage from '../Components/StatusMessage'
import leftImage from '../Assits/register_img_left.png'
import rightImage from '../Assits/register_img_right.png'

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ name: '', email: '', password: '' });
  const [error, setError] = React.useState(''); const [loading, setLoading] = React.useState(false);
  const submit = async (event) => { event.preventDefault(); setError(''); setLoading(true); try { await api.register(form); const session = await api.login({ email: form.email, password: form.password }); saveSession(session); navigate('/dashboard'); } catch (err) { setError(err.message); } finally { setLoading(false); } };
  return (
    <div>
      <div className='registration-bg'>
        <div>
          <img className='rimg-left' src={leftImage} alt="bg-image" />
          <img className='rimg-right' src={rightImage} alt="bg-image" />
        </div>
        <div className='register-card'>
          <div className="header">
            <h2>Create Your Account</h2>
            <p>Join ExTracke and start tracking your money <br /> in a smarter way.</p>
          </div>
          <form className="fields" onSubmit={submit}>
            <input type="text" placeholder='Full Name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} minLength="2" maxLength="50" required />
            <input type="email" placeholder='Email' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input type="password" placeholder='Password (6–12 characters)' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength="6" maxLength="12" required />
            <StatusMessage message={error} />
            <button className='register-btn' disabled={loading}>{loading ? 'Creating…' : 'Create Account'}</button>
          </form>
          <div className="footer">
            <p>Already have an account?  <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
