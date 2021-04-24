import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreateAccount from './components/CreateAccount/CreateAccount';
import DepositMoney from './components/DepositMoney/DepositMoney';
import WithdrawMoney from './components/WithdrawMoney/WithdrawMoney';
import MoneyTransfer from './components/MoneyTransfer/MoneyTransfer';
import './App.css';

class App extends React.Component{
  state = {
    auth:(localStorage.getItem(`token`)!==null)?true:false,
    token: localStorage.getItem(`token`),
    accountExists: (localStorage.getItem(`accountExists`)!=="0")?true:false
  }

  onRegister = (t)=>{
    this.setState(
      {
        auth: true,
        token: t,
        accountExists: false
      },
      ()=>{ localStorage.setItem( 'token', (this.state.token) ) }
    )
  }

  onCreateAccount = (t)=>{

  }

  render(){
    console.log(this.state)
    return(
      <Router>
        <Route exact path="/">{this.state.auth?<Redirect to="/home"/>:<Auth onRegister={this.onRegister}/>}</Route>

        <Route path="/home">{
          this.state.auth?
            (this.state.accountExists?
              <Home Token={this.state.token}/>
              :
              <CreateAccount Token= {this.state.token}/>
            )
            :
            <Redirect to="/"/>
          }
        </Route>

        <Route path='/deposit_money' render={(props)=><DepositMoney {...props} Token={this.state.token}/>}/>
        <Route path='/withdraw_money' render={(props)=><WithdrawMoney {...props} Token={this.state.token}/>}/>
        <Route path='/money_transfer' render={(props)=><MoneyTransfer {...props} Token={this.state.token}/>}/>
      </Router>
    );
  }
}

export default App;
