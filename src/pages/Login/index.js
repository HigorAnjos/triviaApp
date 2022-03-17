import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar from '../../images/img_avatar2.png';
import { fetchToken, setUser } from '../../redux/actions';
import './style.css';

class Login extends Component {
  state = {
    gravatarEmail: '',
    name: '',
  };

  componentDidUpdate() {
    const { token, history } = this.props;
    const isFetchedToken = Boolean(token.length);
    if (isFetchedToken) {
      history.push('/trivia');
    }
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  };

  render() {
    const { gravatarEmail, name } = this.state;
    const isDisabledButton = !(gravatarEmail.length && name.length);
    const { dispatchSetUser, history, dispatchFetchToken } = this.props;

    return (
      <div className="container-form">
        <form
          action="/action_page.php"
          method="post"
          className="container-form-box"
        >
          <header className="container-form-header">
            <img src={ avatar } alt="Avatar" className="img-avatar" />
          </header>

          <main className="container-form-main">
            <label
              htmlFor="gravatarEmail"
              className="container-form-main-label1"
            >
              <input
                className="container-form-main-label1-input1"
                id="gravatarEmail"
                value={ gravatarEmail }
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                type="email"
                placeholder="Email do Gravatar:"
                name="gravatarEmail"
                required
              />
            </label>

            <label htmlFor="name" className="container-form-main-label2">
              <input
                className="container-form-main-label2-input1"
                id="name"
                value={ name }
                onChange={ this.handleChange }
                data-testid="input-player-name"
                type="text"
                placeholder="Nome do Jogador:"
                name="name"
                required
              />
            </label>

            <button
              className={
                isDisabledButton
                  ? 'container-form-main-button1" disabled'
                  : 'container-form-main-button1'
              }
              id="play-Button"
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
              className="container-form-main-button2"
              type="button"
              data-testid="btn-settings"
              onClick={ () => {
                history.push('/Configuration');
              } }
            >
              Configurações
            </button>

            <section className="container-form-section-remember">
              <input
                id="remember"
                type="checkbox"
                name="remember"
                className="container-form-section-remember-input"
              />
              Lembrar-me
            </section>
          </main>
        </form>
      </div>
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
