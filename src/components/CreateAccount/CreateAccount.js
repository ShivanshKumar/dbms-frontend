import React from 'react';
import './CreateAccount.css';
import {Button, Input} from '@material-ui/core';
import axios from 'axios';

class CreateAccount extends React.Component{

    state={
        accountType: '',
        balance: '',
        pin: '',
        locality: '',
        state: '',
        country: '',
    }

    onAccountTypeChangeHandler = (e) => {
        this.setState({
            accountType:e.target.value
        })
    }

    onBalanceChangeHandler = (e) => {
        this.setState({
            balance:e.target.value
        })
    }

    onPinCodeChangeHandler = (e) => {
        this.setState({
            pin:e.target.value
        })
    }

    onLocalityChangeHandler = (e) => {
        this.setState({
            locality:e.target.value
        })
    }

    onStateChangeHandler = (e) => {
        this.setState({
          state:e.target.value
        })
    }

    onCountryChangeHandler = (e) => {
        this.setState({
          country:e.target.value
        })
    }

    onCreateAccountHandler = () => {
        console.log(this.state);

        const accountData = {
            account_type: this.state.accountType,
            balance: this.state.balance,
        }

        const address = {
            PIN: this.state.pin,
            Locality: this.state.locality,
            state: this.state.state,
            country: this.state.country,
        }

        axios.post('https://bank-management-system-dbms.herokuapp.com/createAccount/',accountData,{
            headers:{
                'Authorization': `${this.props.Token}`
            }
        }).then(data=>{
            console.log(data)
            axios.post('https://bank-management-system-dbms.herokuapp.com/address/',address,{
                headers:{
                    'Authorization':`${this.props.Token}`
                }
            }).then(data=>{
                console.log(data)
                this.props.onCreateAccount()
            }).catch(err=>console.log(err));

        }).catch(err=>console.log(err));
    }


    render(){
        console.log(`${this.props.Token}`)
        return(
            <div className="createAccount">
                <div>Account Details</div>
                <Input onChange={this.onAccountTypeChangeHandler} type="text" placeholder="Account Type"/>
                <Input onChange={this.onBalanceChangeHandler} type="number" placeholder="Starting Balance"/>

                <div>Address</div>
                <Input onChange={this.onPinCodeChangeHandler} type="number" placeholder="Pin code "/>
                <Input onChange={this.onLocalityChangeHandler} type="text" placeholder="Locality"/>
                <Input onChange={this.onStateChangeHandler} type="text" placeholder="State"/>
                <Input onChange={this.onCountryChangeHandler} type="text" placeholder="Country"/>
                <Button variant="contained" color="primary" onClick={this.onCreateAccountHandler} type="button">Create Account</Button>
            </div>
        );
    }
}

export default CreateAccount;