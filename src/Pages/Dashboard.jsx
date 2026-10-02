import React from 'react'
import './CSS/Dashboard.css'
import SloganCard from "../Component/SloganCard"
import Card from "../Component/Card"
import Items from '../Component/Items'
import AddExpense from '../Component/AddExpense'
import AIChat from '../Component/AIchat'

const Dashboard = () => {
  return (
    <div>
      <main className='main-container'>
        <AIChat/>
        {/* <AddExpense /> */}
        <section className='side-pannel'>
          <div className="dash-logo">
            <img src="./src/Assits/logo.png" alt="logo" />
          </div>
          <div className="dash-nav">
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">A.I</a></li>
              <li><a href="#">Expenses</a></li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Setting</a></li>
            </ul>
          </div>
          <div className="dash-slogan">
            <SloganCard />
          </div>
        </section>
        <section className='main-dashboard'>
          <div className="dash-upper">
            <div className="welcome-point">
              <h1>Welcome back, UserName </h1>
              <p>Track your expenses and build a better tomorrow.</p>
            </div>
            <div className="expense-btn">
              <button><p>+ Add Expense</p></button>
            </div>
          </div>
          <div className="dash-middle">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className="dash-lower">
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
              <Items />
              <Items />
              <Items />
              <Items />
              <Items />
              <Items />
            </div>
            <div className="expense-category same-box">
              comming soon!
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
