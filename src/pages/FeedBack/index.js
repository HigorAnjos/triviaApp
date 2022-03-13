import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { resetGame } from '../../redux/actions';
import { saveRanking } from '../../services/localstorage';

class FeedBack extends React.Component {
  componentWillUnmount() {
    const { dispatchResetGame } = this.props;
    dispatchResetGame();
  }

  feedback = () => {
    const { assertions } = this.props;
    const THREE_ASSERTIONS = 3;

    if (assertions < THREE_ASSERTIONS) {
      return (<h1 data-testid="feedback-text">Could be better...</h1>);
    }
    return (<h1 data-testid="feedback-text">Well Done!</h1>);
  }

  redirectToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  redirectToRanking = () => {
    const { history, player } = this.props;
    saveRanking(player);
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <main>
          {this.feedback()}
          <h2>
            Voce acertou
            <span data-testid="feedback-total-question">{assertions}</span>
            quetões!
          </h2>
          <h2>
            Um total de
            <span data-testid="feedback-total-score">{score}</span>
            pontos
          </h2>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.redirectToLogin }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.redirectToRanking }
          >
            Ver Ranking
          </button>
        </main>
      </>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchResetGame: PropTypes.func.isRequired,
  player: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResetGame: () => dispatch(resetGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
