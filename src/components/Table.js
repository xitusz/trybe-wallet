import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/table.css';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <div className="table">
        <table border="5">
          <thead> 
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((curr, index) => (
              <tr key={ index }>
                <td>{ curr.description }</td>
                <td>{ curr.tag }</td>
                <td>{ curr.method }</td>
                <td>{ curr.value }</td>
                <td>{ curr.exchangeRates[curr.currency].name.split('/') }</td>
                <td>{ Number(curr.exchangeRates[curr.currency].ask).toFixed(2) }</td>
                <td>
                  { Number(curr.value * curr.exchangeRates[curr.currency].ask).toFixed(2) }
                </td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
