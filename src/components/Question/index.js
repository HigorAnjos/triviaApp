import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTrivia } from '../../redux/actions';

class Question extends React.Component {
  state = {
    questionIndex: 0,
  }

  componentDidMount() {
    const { token, dispatchFetchTriviaQuestions } = this.props;
    dispatchFetchTriviaQuestions(token);
  }

  render() {
    const { questions } = this.props;
    const { questionIndex } = this.state;

    return (
      <main>
        Trivia
      </main>
    );
  }
}

Question.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchFetchTriviaQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchTriviaQuestions: (token) => dispatch(fetchTrivia(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
