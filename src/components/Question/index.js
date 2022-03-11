import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';

const ANSWERS_ARRAY_SIZE = 4;
const CORRECT_ANSWER = 'correct-answer';

class Question extends React.Component {
  renderMultipleAnswers(correct, incorrectList) {
    const randomCorrectIndex = Math.floor(Math.random() * ANSWERS_ARRAY_SIZE);
    const answersList = [...incorrectList];

    answersList.splice(randomCorrectIndex, 0, correct);
    return answersList.map((answer, index) => (
      <button
        type="button"
        className="unselected-answer"
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

    return (
      <>
        {
          answersList.map((answer, index) => (
            <button
              type="button"
              key={ index }
              className="unselected-answer"
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
