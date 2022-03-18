import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRanking } from '../../services/localstorage';
import './style.css';

export class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      storage: [],
    };
  }

  componentDidMount() {
    this.setState({
      storage: getRanking(),
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
    return (
      <section className="ranking-container">
        {storageSort.map(({ name, score, picture }, index) => (
          <div className="rank-card" key={ index }>
            <img className="rank-img" src={ picture } alt="imagem de perfil do jogador" />
            <h1 className="rank-name" data-testid={ `player-name-${index}` }>
              { name }
            </h1>
            <h2 className="rank-score" data-testid={ `player-score-${index}` }>
              { score }
            </h2>
          </div>
        ))}
      </section>
    );
  }

  render() {
    return (
      <main className="Ranking">
        <section className="title-container">
          <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
          <button
            className="home-button"
            data-testid="btn-go-home"
            type="button"
            onClick={ this.handleClick }
          >
            Início
          </button>
        </section>
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
