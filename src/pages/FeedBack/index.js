import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBack extends React.Component {
  feedback = () => {
    const { assertions } = this.props;
    const THREE_ASSERTIONS = 3;

    if (assertions < THREE_ASSERTIONS) {
      return (<h1 data-testid="feedback-text">Could be better...</h1>);
    }
    return (<h1 data-testid="feedback-text">Well Done!</h1>);
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <main>
        { this.feedback() }
        <h2
          data-testid="feedback-total-score"
        >
          { `Voce acertou ${assertions} quetões!`}
        </h2>
        <h2
          data-testid="feedback-total-question"
        >
          { `Um total de ${score} pontos` }
        </h2>
      </main>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(FeedBack);
