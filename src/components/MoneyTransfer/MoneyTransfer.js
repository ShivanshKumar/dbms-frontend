import React from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import {Button, Input} from '@material-ui/core';
import './MoneyTransfer.css';

class MoneyTransfer extends React.Component{

    state = {
        balance: '',
        accountNumber:'',
        transferAmount:'',
        isDone: "none"
    }

    componentDidMount(){

        axios.get('https://bank-management-system-dbms.herokuapp.com/checkbalance', {
            headers: {
              'Authorization': `${this.props.Token}`,
            }
          })
        .then(response=>{
            this.setState({
              balance: response.data.balance,
            })
        })
        .catch(error=>{console.log(error)})

    }

    componentDidUpdate(){
        axios.get('https://bank-management-system-dbms.herokuapp.com/checkbalance', {
            headers: {
              'Authorization': `${this.props.Token}`,
            }
          })
        .then(response=>{
            this.setState({
              balance: response.data.balance,
            })
        })
        .catch(error=>{console.log(error)})

    }



    onAccountNumberChangeHandler = (e) => {
        this.setState({
          accountNumber:e.target.value
        })
    }

    onAmountChangeHandler = (e) => {
        this.setState({
          transferAmount:e.target.value
        })
    }

    onTransferHandler = () =>{
        console.log(this.state);
        const transfer = {
            accountNo: this.state.accountNumber,
            amount: Number(this.state.transferAmount)
          }
          axios.post('https://bank-management-system-dbms.herokuapp.com/moneyTransfer/',transfer,{
            headers: {
              'Authorization': `${this.props.Token}`,
            }
          }
          )
            .then(response=>{
                console.log(response);
                this.setState({
                    isDone: "block"
                },()=>{
                    setTimeout(()=>{this.setState({isDone: "none"})}, 2000 )
                })

             })
    }

    

    render(){
        return(
        <>
            <Header onLogout={this.props.onLogout}/>
            <div className="money_transfer">
                <div className="money_transfer__title">Transfer Money</div>
                <div className="money_transfer__balance">Your Balance is {this.state.balance}</div>
                <div className="money_transfer__form">
                    <Input className="money_transfer__input" onChange={this.onAccountNumberChangeHandler} type="text" placeholder="Enter Account Number of Individual"/>
                    <Input className="money_transfer__input" onChange={this.onAmountChangeHandler} type="text" placeholder="Enter Amount to Transfer"/>
                </div>
                <Button variant="contained" color="primary" onClick={this.onTransferHandler} type="button">Transfer Money</Button>
                <div style={{display: this.state.isDone}}>Transfer Done</div>
            </div>
        </>
        );
    }
}

export default MoneyTransfer;