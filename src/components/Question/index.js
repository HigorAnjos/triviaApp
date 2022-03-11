import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';

const ANSWERS_ARRAY_SIZE = 4;
const CORRECT_ANSWER = 'correct-answer';
const ONE_SECOND = 1000;

class Question extends React.Component {
  state = {
    timer: 30,
    randomCorrectIndex: Math.floor(Math.random() * ANSWERS_ARRAY_SIZE),
  };

  componentDidMount() {
    const interval = setInterval(() => {
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

  renderMultipleAnswers(correct, incorrectList) {
    const { randomCorrectIndex, timer } = this.state;
    const answersList = [...incorrectList];

    answersList.splice(randomCorrectIndex, 0, correct);
    return answersList.map((answer, index) => (
      <button
        type="button"
        className="unselected-answer"
        disabled={ timer < 1 }
        key={ index }
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
              className="unselected-answer"
              disabled={ timer < 1 }
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
};

export default Question;
