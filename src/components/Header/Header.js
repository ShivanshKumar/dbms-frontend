import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

class Header extends React.Component{
    render(){
        return(
        <div className="header">
            <NavLink exact to = "/" className="header__link">HOME</NavLink>
            <NavLink to = "/deposit_money" className="header__link">DEPOSIT MONEY</NavLink>
            <NavLink to = "/withdraw_money" className="header__link">WITHDRAW MONEY</NavLink>
            <NavLink to = "/money_transfer" className="header__link">MONEY TRANSFER</NavLink>
        </div>
        );
    }
}

export default Header;