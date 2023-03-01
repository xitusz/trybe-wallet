import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/header.css';

class Header extends React.Component {
  total = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, curr) => (
      acc + curr.value * curr.exchangeRates[curr.currency].ask
    ), 0).toFixed(2);
  }

  render() {
    const { email } = this.props;

    return (
      <div>
        <header>
          <h1 className="title-wallet">TrybeWallet</h1>
          <hr className="hr-wallet-1" />
          <div className="user-field">
            <p data-testid="email-field" className="email-field">{ email }</p>
            <div className="total">
              <p data-testid="total-field" className="total-field">
                Total:
                { this.total() }
              </p>
              <p data-testid="header-currency-field" className="currency-field">BRL</p>
            </div>
          </div>
        </header>
        <hr className="hr-wallet-2" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
