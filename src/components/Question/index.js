import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken, fetchTrivia } from '../../redux/actions';

const ANSWERS_ARRAY_SIZE = 4;
const TOKEN_ERROR_CODE = 3;
const CORRECT_ANSWER = 'CORRECT_ANSWER';

class Question extends React.Component {
  state = {
    questionIndex: 0,
  }

  componentDidMount() {
    const { token, dispatchFetchTriviaQuestions } = this.props;
    dispatchFetchTriviaQuestions(token);
  }

  componentDidUpdate({ responseCode: prevResponseCode }) {
    const { token, responseCode, dispatchFetchToken,
      dispatchFetchTriviaQuestions } = this.props;
    if (responseCode === TOKEN_ERROR_CODE) {
      dispatchFetchToken();
    } else if (prevResponseCode === TOKEN_ERROR_CODE) {
      dispatchFetchTriviaQuestions(token);
    }
  }

  renderMultipleAnswers(correct, incorrect) {
    const randomCorrectIndex = Math.floor(Math.random() * ANSWERS_ARRAY_SIZE);
    const answersList = [...incorrect];

    answersList.splice(randomCorrectIndex, 0, correct);

    return answersList.map((answer, index) => (
      <button
        type="button"
        className="unselected-answer"
        key={ index }
        data-testid={ index === randomCorrectIndex
          ? CORRECT_ANSWER
          : `wrong-answer${incorrect.indexOf(answer)}` }
      >
        {answer}
      </button>
    ));
  }

  renderBoolAnswers(correct) {
    const isTrue = correct === 'True';
    return (
      <>
        <button
          type="button"
          className="unselected-answer"
          data-testid={ isTrue
            ? CORRECT_ANSWER
            : 'wrong-answer-0' }
        >
          True
        </button>
        <button
          type="button"
          className="unselected-answer"
          data-testid={ !isTrue
            ? CORRECT_ANSWER
            : 'wrong-answer-0' }
        >
          False
        </button>
      </>

    );
  }

  renderQuestion({ type, category, question, correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers }) {
    return (
      <main>
        <section className="question-container">
          <h1 data-testid="question-category">{category}</h1>
          <p data-testid="question-text">{question}</p>
        </section>
        <section className="answers-container" data-testid="answer-options">
          {type === 'multiple'
            ? this.renderMultipleAnswers(correctAnswer, incorrectAnswers)
            : this.renderBoolAnswers(correctAnswer)}
        </section>
      </main>
    );
  }

  render() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const question = questions[questionIndex];
    const isLoading = !questions.length;

    if (isLoading) {
      return (
        <main>
          <h1>Carregando questão!</h1>
        </main>
      );
    }

    return this.renderQuestion(question);
  }
}

Question.propTypes = {
  token: PropTypes.string.isRequired,
  responseCode: PropTypes.number,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchFetchToken: PropTypes.func.isRequired,
  dispatchFetchTriviaQuestions: PropTypes.func.isRequired,
};

Question.defaultProps = {
  responseCode: 0,
};

const mapStateToProps = (state) => ({
  responseCode: state.trivia.response_code,
  questions: state.trivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchToken: () => dispatch(fetchToken()),
  dispatchFetchTriviaQuestions: (token) => dispatch(fetchTrivia(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
