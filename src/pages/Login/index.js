import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchToken, setUser } from '../../redux/actions';

class Login extends Component {
  state = {
    gravatarEmail: '',
    name: '',
  }

  componentDidUpdate() {
    const { token, history } = this.props;
    const isFetchedToken = Boolean(token.length);
    if (isFetchedToken) { history.push('/trivia'); }
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  }

  render() {
    const { gravatarEmail, name } = this.state;
    const isDisabledButton = !(gravatarEmail.length && name.length);
    const { dispatchSetUser, history, dispatchFetchToken } = this.props;

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
              dispatchFetchToken();
            } }
            data-testid="btn-play"
          >
            Jogar
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => {
              history.push('/Configuration');
            } }
          >
            Configurações
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  token: propTypes.string.isRequired,
  dispatchSetUser: propTypes.func.isRequired,
  dispatchFetchToken: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetUser: (user) => dispatch(setUser(user)),
  dispatchFetchToken: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
