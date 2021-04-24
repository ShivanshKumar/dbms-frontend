import React from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Profile.css';

class Profile extends React.Component{

    state = {
        balance: '',

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
            // this.setState({
            //   balance: response.data.balance,
            // })
        })
        .catch(error=>{console.log(error)})

        axios.get('https://bank-management-system-dbms.herokuapp.com/transactions', {
            headers: {
              'Authorization': `${this.props.Token}`,
            }
          })
        .then(response=>{
            console.log(response)
            // this.setState({
            //   balance: response.data.balance,
            // })
        })
        .catch(error=>{console.log(error)})

    }

    render(){
        return(
        <>
        <Header/>
        <div className="profile">
        </div>
        </>
        );
    }
}

export default Profile;