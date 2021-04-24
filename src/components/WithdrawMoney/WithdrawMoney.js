import React from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import {Button, Input} from '@material-ui/core';
import './WithdrawMoney.css';

class WithdrawMoney extends React.Component{

    state = {
        balance: '',
        withdrawAmount:'',
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



    onWithdrawChangeHandler = (e) => {
        this.setState({
          withdrawAmount:e.target.value
        })
    }

    onWithdrawHandler = () =>{
        console.log(this.state);
        const withdraw = {
            type: "withdraw",
            amount: Number(this.state.withdrawAmount)
          }
          axios.post('https://bank-management-system-dbms.herokuapp.com/updateBalance/',withdraw,{
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
            <Header/>
            <div className="withdraw">
                <div className="withdraw__title">Withdraw Money</div>
                <div className="withdraw__balance">Your Balance is {this.state.balance}</div>
                <Input className="withdraw__input" onChange={this.onWithdrawChangeHandler} type="text" placeholder="Enter Amount to Withdraw"/>
                <Button variant="contained" color="primary" onClick={this.onWithdrawHandler} type="button">Withdraw</Button>
                <div style={{display: this.state.isDone}}>Done</div>
            </div>
        </>
        );
    }
}

export default WithdrawMoney;