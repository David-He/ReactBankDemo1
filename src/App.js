import React, { Component } from 'react';
import  BankStore from './store';
import Constans from './constants';
import PropTypes from 'prop-types'

import './App.css';
import bankStore from './store';
import constants from './constants';
import BankActionCreator from "./bankActionCreators";

class BankApp extends Component {
  handleDeposit(){
    this.props.onDeposit(this.refs.amount.value);
    this.refs.amount.value = '';
  }

  handleWithdraw(){
    this.props.onWithdraw(this.refs.amount.value);
    this.refs.amount.value = '';
  }

  render(){
    return(
    <div>
      <header>
        <img src='//www.pro-react.com/logos/redux-bank.svg' width='150'/>Redux Bank
      </header>
      <h1>Your balance is ${(this.props.balance).toFixed(2)}</h1>
      <div className='atm'>
        <input type = 'text' placeholder="Enter Ammount" ref="amount"/>
        <button onClick={this.handleWithdraw.bind(this)}>取款</button>
        <button onClick={this.handleDeposit.bind(this)}>存款</button>
      </div>
    </div>
    );
  }
}

BankApp.proTypes = {
  balance: PropTypes.number,
  onDeposit: PropTypes.func,
  onWithdraw: PropTypes.func.isRequired
};


class BankAppContainer extends Component{
  constructor(...args){
    super(...args);
    //bankStore.dispatch({type: constants.CREATE_ACCOUNT});
    this.state={
      balance: bankStore.getState().balance
    }
  }

  componentDidMount(){
    this.unsubscribe = bankStore.subscribe(()=>
      this.setState({balance: bankStore.getState().balance})
    )

  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render(){
    return(
    <BankApp balance = {this.state.balance}
     onWithdraw = {(amount)=>bankStore.dispatch(BankActionCreator.withdrawFromAccount(amount))}  
    onDeposit ={(amount)=>bankStore.dispatch(BankActionCreator.depositIntoAccount(amount))}
      
    />
    )
  }
}
export default BankAppContainer;
