import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions';

class Login extends Component {
  state = {
    gravatarEmail: '',
    name: '',
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  }

  render() {
    const { gravatarEmail, name } = this.state;
    const isDisabledButton = !(gravatarEmail.length && name.length);
    const { dispatchSetUser, history } = this.props;

    return (
      <main>
        <form>
          <label htmlFor="gravatarEmail">
            Email do Gravatar:
            <input
              id="gravatarEmail"
              value={ gravatarEmail }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <label htmlFor="name">
            Nome do Jogador:
            <input
              id="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <button
            type="button"
            disabled={ isDisabledButton }
            onClick={ () => {
              dispatchSetUser(this.state);
              history.push('/trivia');
            } }
            data-testid="btn-play"
          >
            JOGAR!
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatchSetUser: propTypes.func.isRequired,
  history: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetUser: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);
