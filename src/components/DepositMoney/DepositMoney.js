import React from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import {Button, Input} from '@material-ui/core';
import './DepositMoney.css';

class DepositMoney extends React.Component{

    state = {
        balance: '',
        depositAmount:'',
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



    onDepositChangeHandler = (e) => {
        this.setState({
          depositAmount:e.target.value
        })
    }

    onDepositHandler = () =>{
        console.log(this.state);
        const deposit = {
            type: "deposit",
            amount: Number(this.state.depositAmount)
          }
          axios.post('https://bank-management-system-dbms.herokuapp.com/updateBalance/',deposit,{
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
            <div className="deposit">
                <div className="deposit__title">Deposit Money</div>
                <div className="deposit__balance">Your Balance is {this.state.balance}</div>
                <Input className="deposit__input" onChange={this.onDepositChangeHandler} type="text" placeholder="Enter Amount to deposit"/>
                <Button variant="contained" color="primary" onClick={this.onDepositHandler} type="button">Deposit</Button>
                <div style={{display: this.state.isDone}}>Done</div>
            </div>
        </>
        );
    }
}

export default DepositMoney;