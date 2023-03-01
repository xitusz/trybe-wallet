import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionUser } from '../actions';
import '../css/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.validateButton();
    });
  }

  validateButton = () => {
    const { email, password } = this.state;
    const min = 6;
    if (this.validateEmail(email) && password.length >= min) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  validateEmail = (email) => String(email).toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  handleClick = () => {
    const { saveEmail, history } = this.props;
    const { email } = this.state;

    saveEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;

    return (
      <div className="page-login">
        <form className="form-login">
          <h1 className="title-login">Login</h1>
          <hr className="hr-login" />
          <div className="login">
            <div className="input-login">
              <label htmlFor="email">
                <input
                  type="email"
                  data-testid="email-input"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="password">
                <input
                  type="password"
                  data-testid="password-input"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={ password }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <button
              type="submit"
              className="login-button"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(actionUser(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
