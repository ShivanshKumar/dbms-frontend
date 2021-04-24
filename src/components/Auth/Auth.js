import React from 'react';
import './Auth.css';
import {Button, Input} from '@material-ui/core';
import axios from 'axios';
class Auth extends React.Component{

    state={
        name:'',
        email:'',
        date:'',
        password:'',
        flag:1,
        signIn: {
            email: '',
            password: ''
        }
    }

    onNameChangeHandler = (e) => {
        this.setState({
          name:e.target.value
        })
    }
    onEmailChangeHandler = (e) => {
        this.setState({
          email:e.target.value
        })
    }

    onDateChangeHandler = (e) => {
        this.setState({
          date:e.target.value
        })
    }

    onPasswordChangeHandler = (e) => {
        this.setState({
          password:e.target.value
        })
    }

    onRegisterHandler = () =>{
        console.log(this.state);
        const authData = {
            Name: this.state.name,
            Email:this.state.email,
            DOB:this.state.date,
            password:this.state.password
          }
          axios.post('https://bank-management-system-dbms.herokuapp.com/register/',authData)
            .then(response=>{
                console.log(response);
                this.props.onRegister(response.data.token);
             })
    }

    onSignInEmailChangeHandler = (e) => {
        this.setState({
          signIn:{
                email: e.target.value,
                password: this.state.signIn.password
            }
        })
    }

    onSignInPasswordChangeHandler = (e) => {
            this.setState({
              signIn:{
                  email: this.state.signIn.email,
                  password:e.target.value}
            })
        }
    onSignInHandler = () =>{
        console.log(this.state);
        const signInData = {
            Email: this.state.signIn.email,
            password: this.state.signIn.password
        }
        console.log(signInData);
        axios.post('https://bank-management-system-dbms.herokuapp.com/login',signInData)
        .then(response=>{
            console.log(response);
            this.props.onLogin(response.data.token);
         })
    }

    render(){
        return(
        <div className="auth">
            <div className="auth__prompt">
                <div onClick={ ()=>{this.setState({flag:1})} }>Register</div>
                <div onClick={ ()=>{this.setState({flag:0})} }>Sign In</div>
            </div>
            {
            this.state.flag?
            <div className="auth__register">
                <Input className="auth__register__input" onChange={this.onNameChangeHandler} type="text" placeholder="Name "/>
                <Input className="auth__register__input" onChange={this.onEmailChangeHandler} type="email" placeholder="Email"/>
                <Input className="auth__register__input" onChange={this.onDateChangeHandler} type="date" placeholder="Date of birth"/>
                <Input className="auth__register__input" onChange={this.onPasswordChangeHandler} type="password" placeholder="Password"/>
                <Button variant="contained" color="primary" className="auth__register__submit" onClick={this.onRegisterHandler} type="button">Register</Button>
            </div>
            :
            <div className="auth__signin">
                <Input className="auth__signin__input" onChange={this.onSignInEmailChangeHandler} type="text" placeholder="Email"/>
                <Input className="auth__signin__input" onChange={this.onSignInPasswordChangeHandler} type="password" placeholder="Password"/>
                <Button variant="contained" color="primary" className="auth__signin__submit" onClick={this.onSignInHandler} type="button">Sign In</Button>
            </div>
            }
        </div>
        );
    }
}

export default Auth;