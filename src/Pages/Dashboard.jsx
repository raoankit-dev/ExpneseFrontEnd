import React from 'react'
import './CSS/Dashboard.css'
import SloganCard from "../Component/SloganCard"
import Card from "../Component/Card"
import Items from '../Component/Items'
import AddExpense from '../Component/AddExpense'
import AIChat from '../Component/AIChat'
import { api, clearSession } from '../api'
import { useNavigate } from 'react-router-dom'
import logo from '../Assits/logo.png'

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null); const [expenses, setExpenses] = React.useState([]); const [analysis, setAnalysis] = React.useState(null);
  const [activeView, setActiveView] = React.useState('dashboard');
  const [darkMode, setDarkMode] = React.useState(() => localStorage.getItem('expense_dark_mode') === 'true');
  const [showExpense, setShowExpense] = React.useState(false); const [editingExpense, setEditingExpense] = React.useState(null); const [showAI, setShowAI] = React.useState(false); const [error, setError] = React.useState(''); const [loading, setLoading] = React.useState(true);
  const loadData = React.useCallback(async () => { try { const [me, list] = await Promise.all([api.me(), api.expenses()]); setUser(me?.data || me); setExpenses(list?.data || []); try { const insight = await api.analyze(); setAnalysis(insight?.data || insight); } catch { /* the dashboard still works without AI analysis */ } } catch (err) { setError(err.message); } finally { setLoading(false); } }, []);
  // The async loader synchronizes the dashboard with the authenticated API.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => { loadData(); }, [loadData]);
  const addExpense = async (payload) => { await api.createExpense(payload); await loadData(); };
  const updateExpense = async (payload) => { await api.updateExpense(editingExpense.id, payload); await loadData(); };
  const editExpense = (expense) => { setEditingExpense(expense); setShowExpense(true); };
  const deleteExpense = async (id) => { if (!window.confirm('Delete this expense?')) return; await api.deleteExpense(id); setExpenses((current) => current.filter((item) => item.id !== id)); };
  const logout = () => { clearSession(); navigate('/login'); };
  const today = new Date().toISOString().slice(0, 10); const month = new Date().getMonth(); const year = new Date().getFullYear();
  const todayTotal = expenses.filter((e) => String(e.expense_date).slice(0, 10) === today).reduce((sum, e) => sum + Number(e.amount), 0);
  const monthExpenses = expenses.filter((e) => { const date = new Date(e.expense_date); return date.getMonth() === month && date.getFullYear() === year; });
  const monthTotal = monthExpenses.reduce((sum, e) => sum + Number(e.amount), 0); const categories = monthExpenses.reduce((all, e) => ({ ...all, [e.category]: (all[e.category] || 0) + Number(e.amount) }), {}); const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
  const openAI = () => { setShowAI(true); };
  const toggleDarkMode = () => setDarkMode((current) => { const next = !current; localStorage.setItem('expense_dark_mode', String(next)); return next; });
  return (
    <div>
      <main className={`main-container ${darkMode ? 'theme-dark' : ''}`}>
        {showAI && <AIChat onClose={() => setShowAI(false)} userName={user?.name?.split(' ')[0]} analysis={analysis} />}
        {showExpense && <AddExpense expense={editingExpense} onClose={() => { setShowExpense(false); setEditingExpense(null); }} onSaved={editingExpense ? updateExpense : addExpense} />}
        <section className='side-pannel'>
          <div className="dash-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="dash-nav">
            <ul>
              <li onClick={() => setActiveView('dashboard')}><button type="button" className={`nav-link ${activeView === 'dashboard' ? 'active' : ''}`}>Dashboard</button></li>
              <li onClick={openAI}><button type="button" className="nav-link">A.I</button></li>
              <li onClick={() => setActiveView('expenses')}><button type="button" className={`nav-link ${activeView === 'expenses' ? 'active' : ''}`}>Expenses</button></li>
              <li onClick={logout}><button type="button" className="nav-link">Log out</button></li>
            </ul>
          </div>
          <div className="dash-slogan">
            <SloganCard />
          </div>
        </section>
        <section className='main-dashboard'>
          <div className="dash-upper">
            <div className="welcome-point">
              <h1>{activeView === 'expenses' ? 'All Expenses' : `Welcome back, ${user?.name || 'User'}`}</h1>
              <p>{activeView === 'expenses' ? 'Review and manage every expense in one place.' : 'Track your expenses and build a better tomorrow.'}</p>
            </div>
            <div className="expense-btn">
              <button className="theme-toggle" onClick={toggleDarkMode} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{darkMode ? '☀' : '☾'}</button>
              <button onClick={() => setShowExpense(true)}><p>+ Add Expense</p></button>
            </div>
          </div>
          {activeView === 'dashboard' && <div className="dash-middle">
            <Card label="Today Expense" value={todayTotal} icon="💸" />
            <Card label="This Month" value={monthTotal} accent="green" icon="🗓️" />
            <Card label="Expenses" value={expenses.length} accent="blue" icon="🧾" currency={false} />
            <Card label="Top Category" value={topCategory ? topCategory[1] : 0} accent="red" icon="🏷️" detail={topCategory?.[0] || 'No category yet'} />
          </div>}
          {activeView === 'dashboard' ? <div className="dash-lower">
            <div className="expense-list same-box">
              <div className="header-expense">
                <h3>Recent Expenses</h3>
                <div className='header-heading'>
                  <p>Item</p>
                  <p>Category</p>
                  <p>Date</p>
                  <p>Amount</p>
                </div>
              </div>
              {loading && <p className="empty-state">Loading your expenses…</p>}
              {!loading && !expenses.length && <p className="empty-state">No expenses yet. Add your first one!</p>}
              {expenses.slice(0, 8).map((expense) => <Items key={expense.id} expense={expense} onDelete={deleteExpense} onEdit={editExpense} />)}
            </div>
            <div className="expense-category same-box">
              <div className="dashboard-insight"><div className="insight-title">💡 Spending Insight</div><h3>{topCategory?.[0] || 'No category yet'}</h3><p>{analysis?.summary || (topCategory ? `₹ ${topCategory[1].toLocaleString('en-IN')} this month` : 'Add a few expenses to see your spending insight.')}</p><strong>{analysis?.suggestions?.[0] || 'Your personalized suggestion will appear here.'}</strong><button className="ai-open-btn" onClick={openAI}>Ask A.I.</button></div>
            </div>
          </div> : <div className="all-expenses-view same-box">
            <div className="header-expense"><h3>All Expenses ({expenses.length})</h3><div className='header-heading'><p>Item</p><p>Category</p><p>Date</p><p>Amount</p></div></div>
            {loading && <p className="empty-state">Loading your expenses…</p>}
            {!loading && !expenses.length && <p className="empty-state">No expenses yet. Add your first one!</p>}
            {expenses.map((expense) => <Items key={expense.id} expense={expense} onDelete={deleteExpense} onEdit={editExpense} />)}
          </div>}
          {error && <p className="status-message error dashboard-error">{error}</p>}
        </section>
      </main>
    </div>
  )
}

export default Dashboard
