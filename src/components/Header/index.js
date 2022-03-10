import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarUrl from '../../services/gravatar';

class Header extends React.Component {
  render() {
    const { name, score, gravatarEmail } = this.props;

    return (
      <header>
        <img
          src={ getGravatarUrl(gravatarEmail) }
          alt="Imagem de perfil"
          data-testid="header-profile-picture"
        />

        <h1 data-testid="header-player-name">
          { name }
        </h1>

        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
