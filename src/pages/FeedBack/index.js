import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { oneOfType, string, number } from 'prop-types';
import Header from '../../components/Header';
import { resetGame } from '../../redux/actions';
import { saveRanking } from '../../services/localstorage';
import './style.css';

class FeedBack extends React.Component {
  componentDidMount() {
    const { player } = this.props;
    if (player.name !== '') {
      saveRanking(player);
    }
  }

  componentWillUnmount() {
    const { dispatchResetGame } = this.props;
    dispatchResetGame();
  }

  feedback = () => {
    const { assertions } = this.props;
    const THREE_ASSERTIONS = 3;

    if (assertions < THREE_ASSERTIONS) {
      return (<h1 className="fb-h1" data-testid="feedback-text">Could be better...</h1>);
    }
    return (<h1 className="fb-h1" data-testid="feedback-text">Well Done!</h1>);
  }

  redirectToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <main className="FeedBack">
          <section className="feedback-container">
            {this.feedback()}
            <h2 className="fb-h2">
              Voce acertou
              <span data-testid="feedback-total-question">{` ${assertions} `}</span>
              questões!
            </h2>
            <h2 className="fb-h2">
              Um total de
              <span data-testid="feedback-total-score">{` ${score} `}</span>
              pontos.
            </h2>
          </section>
          <section className="fb-buttons-container">
            <button
              className="play-again-button"
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
          </section>
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
  player: PropTypes.objectOf(oneOfType([string, number])).isRequired,
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
