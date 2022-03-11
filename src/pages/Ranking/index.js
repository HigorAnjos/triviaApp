import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPrevRanking } from '../../services/localstorage';

export class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      storage: [],
    };
  }

  componentDidMount() {
    this.setState({
      storage: getPrevRanking(),
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  rankingList = () => {
    const { storage } = this.state;
    const storageSort = storage.sort((a, b) => {
      if (a.score < b.score) {
        const ONE = 1;
        return ONE;
      }
      if (a.score > b.score) {
        const ONE_LESS = -1;
        return ONE_LESS;
      }
      return 0;
    });
    return storageSort.map(({ name, score, picture }, index) => (
      <div key={ index }>
        <img src={ picture } alt="imagem de perfil do jogador" />
        <h1 data-testid={ `player-name-${index}` }>{ name }</h1>
        <h2 data-testid={ `player-score-${index}` }>{ score }</h2>
      </div>
    ));
  }

  render() {
    return (
      <main>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClick }
        >
          inicio
        </button>
        {
          this.rankingList()
        }
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
