import "./CSS/Home.css"
import logo from '../Assits/logo.png'

const Home = () => {
  return (
    <div className='container'>
      <header className="home-header">
        <div className="home-logo">
          <img src={logo} alt="ExTracke logo" />
        </div>
        <nav className="home-links">
          <a href="/register">Join Us!</a>
          <a href="/login">Login</a>
        </nav>
      </header>
      <section className='hero'>
          <div className="greet">Hello Users!</div>
          <p className='descr'>
            <span>TAKE CONTROL OF YOUR MONEY.</span> <br />
            Track your income, expenses, and spending habits in one bold and simple dashboard. Know where your money goes, set better budgets, and make smarter financial decisions
          </p>
      </section>
    </div>
  )
}

export default Home
