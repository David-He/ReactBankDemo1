import React, { Component } from 'react';
import PropTypes from 'prop-types'

import './App.css';
import bankStore from './store';
import {connect, Provider} from 'react-redux';
import bankActionCreators from './bankActionCreators';

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
        <img src='//www.pro-react.com/logos/redux-bank.svg' width='150' alt="img" />Redux Bank
      </header>
      <h1>Your balance is ${(this.props.balance).toFixed(2)}</h1>
      <div className='atm'>
        <input type = 'text' placeholder="Enter Ammount" ref="amount"/>
        <button onClick={this.handleWithdraw.bind(this)}>取款</button>
        <button onClick={this.handleDeposit.bind(this)}>存款</button>
      </div>
      <div className="exchange" onClick={this.props.onToggle}>
        <strong>Exchange Rates:</strong>
        <div className={this.props.showExchange ?'exchange--visible': 'exchange--closed'}>
          <strong>$1 USD =</strong>
          <span className="rate">0.9990 EUR</span>
          <span className="rate">6.8720 RMB</span>
          <span className="rate">0.7989 GBP</span>
        </div>
      </div>
    </div>
    
    
    );
  }
}

BankApp.proTypes = {
  balance: PropTypes.number,
  showExchange: PropTypes.bool,
  onDeposit: PropTypes.func,
  onWithdraw: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
};


const mapStateToProps = (state)=>{
  return{
    balance: state.balance,
    showExchange: state.ui.showExchange,
  }
}

const mapDispatchToProps =(dispatch)=>{
  return{
    onDeposit: (amount)=>dispatch(bankActionCreators.depositIntoAccount(amount)),
    onWithdraw:(amount)=>dispatch(bankActionCreators.withdrawFromAccount(amount)),
    onToggle: ()=>dispatch(bankActionCreators.toggleInfo()),
  }
}

const BankAppContainer = connect(mapStateToProps, mapDispatchToProps)(BankApp);

class AppContainer extends Component{
  render(){
    return(
      <Provider store={bankStore}> 
        <BankAppContainer/>
      </Provider>
    )
  }
}
export default AppContainer;
