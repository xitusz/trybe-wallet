import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunk } from '../actions';
import requestApi from '../services/api';
import '../css/formsWallet.css';

class FormsWallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencies: [],
    };
  }

  componentDidMount() {
    this.requestCurrencies();
  }

  requestCurrencies = () => {
    requestApi().then((data) => {
      const currencies = Object.keys(data).filter((curr) => curr !== 'USDT');
      this.setState({
        currencies,
      });
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleClick = () => {
    const { saveExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;

    saveExpense({ value, description, currency, method, tag });

    this.setState({
      value: 0,
      description: '',
    });
  }

  render() {
    const { value, description, currency, method, tag, currencies } = this.state;

    return (
      <div className="forms-wallet">
        <form>
          <div className="value-inputs">
            <label
              htmlFor="value"
            >
              Valor:
              <input
                type="text"
                data-testid="value-input"
                id="value"
                name="value"
                className="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="currency"
            >
              Moeda:
              <select
                data-testid="currency-input"
                id="currency"
                name="currency"
                className="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                {
                  currencies.map((curr, index) => (
                    <option
                      value={ curr }
                      key={ index }
                      data-testid={ curr }
                    >
                      { curr }
                    </option>
                  ))
                }
              </select>
            </label>
            <label
              htmlFor="method"
            >
              Método de Pagamento:
              <select
                data-testid="method-input"
                id="method"
                name="method"
                className="method"
                value={ method }
                onChange={ this.handleChange }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de débito">Cartão de débito</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
              </select>
            </label>
          </div>
          <div className="description-inputs">
            <label
              htmlFor="description"
            >
              Descrição:
              <input
                type="text"
                data-testid="description-input"
                id="description"
                name="description"
                className="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <label
              htmlFor="tag"
            >
              Categoria:
              <select
                data-testid="tag-input"
                id="tag"
                name="tag"
                className="tag"
                value={ tag }
                onChange={ this.handleChange }
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>
          </div>
          <button
            type="button"
            className="add-button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

FormsWallet.propTypes = {
  saveExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expenses) => dispatch(thunk(expenses)),
});

export default connect(null, mapDispatchToProps)(FormsWallet);
