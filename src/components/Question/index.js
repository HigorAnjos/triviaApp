import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { connect } from 'react-redux';
import { setScore } from '../../redux/actions';

const ANSWERS_ARRAY_SIZE = 4;
const CORRECT_ANSWER = 'correct-answer';
const ONE_SECOND = 1000;
let interval;

class Question extends React.Component {
  state = {
    timer: 30,
    randomCorrectIndex: Math.floor(Math.random() * ANSWERS_ARRAY_SIZE),
  };

  componentDidMount() {
    interval = setInterval(() => {
      const { timer } = this.state;
      if (timer <= 0) {
        clearInterval(interval);
      } else {
        this.setState({
          timer: timer - 1,
        });
      }
    }, ONE_SECOND);
  }

  handleClickAnswer = ({ target: { value } }) => {
    const { timer } = this.state;
    const { dispatchSetScore, question: { difficulty } } = this.props;
    const difficultyPoints = { hard: 3, medium: 2, easy: 1 };

    if (value === 'true') {
      // para o timer
      clearInterval(interval);
      // set o score se acertou no redux
      dispatchSetScore(timer, difficultyPoints[difficulty]);
    }
  }

  renderMultipleAnswers(correct, incorrectList) {
    const { randomCorrectIndex, timer } = this.state;
    const answersList = [...incorrectList];

    answersList.splice(randomCorrectIndex, 0, correct);
    return answersList.map((answer, index) => (
      <button
        type="button"
        onClick={ this.handleClickAnswer }
        className="unselected-answer"
        disabled={ timer < 1 }
        key={ index }
        value={ (index === randomCorrectIndex) }
        data-testid={ index === randomCorrectIndex
          ? CORRECT_ANSWER
          : `wrong-answer${incorrectList.indexOf(answer)}` }
      >
        {answer}
      </button>
    ));
  }

  renderBoolAnswers(correct) {
    const answersList = ['True', 'False'];
    const { timer } = this.state;

    return (
      <>
        {
          answersList.map((answer, index) => (
            <button
              type="button"
              key={ index }
              onClick={ this.handleClickAnswer }
              className="unselected-answer"
              disabled={ timer < 1 }
              value={ (answer === correct) }
              data-testid={ answer === correct
                ? CORRECT_ANSWER
                : 'wrong-answer-0' }
            >
              {answer}
            </button>
          ))
        }
      </>
    );
  }

  render() {
    const { question: { type, category, question: questionText,
      correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } } = this.props;
    const { timer } = this.state;

    return (
      <main>
        <section className="question-container">
          <h1 data-testid="question-category">{category}</h1>
          <p data-testid="question-text">{questionText}</p>
        </section>

        <section className="answers-container" data-testid="answer-options">
          {type === 'multiple'
            ? this.renderMultipleAnswers(correctAnswer, incorrectAnswers)
            : this.renderBoolAnswers(correctAnswer)}
          <div>
            { timer }
          </div>
          <div>
            <button
              type="button"
            >
              Próxima
            </button>
          </div>
        </section>
      </main>
    );
  }
}

Question.propTypes = {
  question: PropTypes.objectOf(oneOfType([
    PropTypes.string,
    PropTypes.array,
  ])).isRequired,
  dispatchSetScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetScore: (timer, difficulty) => dispatch(setScore(timer, difficulty)),
});

export default connect(null, mapDispatchToProps)(Question);
