import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

class FeedBack extends React.Component {
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
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <main>
          {this.feedback()}
          <h2
            data-testid="feedback-total-score"
          >
            {`Voce acertou ${assertions} quetões!`}
          </h2>
          <h2
            data-testid="feedback-total-question"
          >
            {`Um total de ${score} pontos`}
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
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(FeedBack);
