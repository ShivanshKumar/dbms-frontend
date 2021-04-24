import React from 'react';
import Header from '../Header/Header';
import {Avatar, Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import './Home.css';

class Home extends React.Component{
    render(){
        return(
        <>
        <Header/>
        <div className="home">
            <Avatar className="home__avatar" src="/broken-image.jpg" />
            <div className="home__buttons">
            <Button variant="contained" color="primary" type="button">
                <NavLink to = "/deposit_money" className="home__buttons__link">DEPOSIT MONEY</NavLink>
            </Button>
            <Button variant="contained" color="primary" type="button">
                <NavLink to = "/withdraw_money" className="home__buttons__link">WITHDRAW MONEY</NavLink>
            </Button>
            <Button variant="contained" color="primary" type="button">
                <NavLink to = "/money_transfer" className="home__buttons__link">MONEY TRANSFER</NavLink>
            </Button>
            </div>
        </div>
        </>
        );
    }
}

export default Home;