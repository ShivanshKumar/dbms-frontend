import React from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import Transactions from './Transactions/Transactions'
import './Profile.css';

class Profile extends React.Component{

    state = {
        balance: '',
        name: '',
        email: '',
        dob: '',
        pin: '',
        locality: '',
        state: '',
        country: '',
        accountNumber:'',
        transactions: [],
        flag:false
    }

    componentDidMount(){

        axios.get('https://bank-management-system-dbms.herokuapp.com/checkbalance', {
            headers: {
              'Authorization': `${this.props.Token}`,
            }
          })
        .then(response=>{
            console.log(response)
            this.setState({
              balance: response.data.balance,
            })
        })
        .catch(error=>{console.log(error)})

        axios.get('https://bank-management-system-dbms.herokuapp.com/me', {
            headers: {
              'Authorization': `${this.props.Token}`,
            }
          })
        .then(response=>{
            console.log(response)
            this.setState({
              name: response.data.Name,
              email: response.data.Email,
              dob: response.data.DOB,
              pin: response.data.PIN,
              locality: response.data.Locality,
              state: response.data.state,
              country: response.data.country,
            })
        })
        .catch(error=>{console.log(error)})

        axios.get('https://bank-management-system-dbms.herokuapp.com/transactions', {
            headers: {
              'Authorization': `${this.props.Token}`,
            }
          })
        .then(response=>{
            console.log(response)
            this.setState({
              transactions: response.data,
              flag:true
            })
        })
        .catch(error=>{console.log(error)})

        axios.get('https://bank-management-system-dbms.herokuapp.com/accountDetails', {
          headers: {
            'Authorization': `${this.props.Token}`,
          }
        })
      .then(response=>{
          console.log(response)
          this.setState({
            accountNumber: response.data[0].account_number,
          })
      })
      .catch(error=>{console.log(error)})

    }

    render(){
        console.log(this.state);
        return(
        <>
        <Header onLogout={this.props.onLogout}/>
        <div className="profile">
          <div className="profile__details">
            <div className="profile__name">Name: {this.state.name}</div>
            <div className="profile__dob">Date of Birth: {this.state.dob}</div>
            <div className="profile__email">Email: {this.state.email}</div>
            <div className="profile__account_number">Account Number: {this.state.accountNumber}</div>
            <div className="profile__account_balance">Account Balance: {this.state.balance}</div>
            <div className="profile__address">Address: {this.state.pin}, {this.state.locality}, {this.state.state}, {this.state.country}</div>
          </div>
          <div className="profile__transactions">
            <span>Transactions Record</span>
            {this.state.flag?<Transactions transactions={this.state.transactions}/>:null}
          </div>
        </div>
        </>
        );
    }
}

export default Profile;