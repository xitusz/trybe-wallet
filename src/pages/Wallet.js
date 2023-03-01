import React from 'react';
import Header from '../components/Header';
import FormsWallet from '../components/FormsWallet';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormsWallet />
        <Table />
      </div>
    );
  }
}

export default Wallet;
