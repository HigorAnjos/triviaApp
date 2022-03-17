import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { connect } from 'react-redux';
import { setScore } from '../../redux/actions';
import './style.css';

const TIMER_SEC = 30;
const ANSWERS_ARRAY_SIZE = 4;
const CORRECT_ANSWER = 'correct-answer';
const ONE_SECOND = 1000;
const LIMIT_QUESTIONS = 4;
const TIMER_ENDING = 5;
let interval;

class Question extends React.Component {
  state = {
    timer: TIMER_SEC,
    randomCorrectIndex: Math.floor(Math.random() * ANSWERS_ARRAY_SIZE),
    isBtnNextVisible: false,
    hasStylesBtns: false,
    clickedAnswerIndex: '',
  };

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    interval = setInterval(() => {
      const { timer } = this.state;
      if (timer <= 0) {
        clearInterval(interval);
      } else {
        this.setState({
          timer: timer - 1,
        }, () => {
          if (timer === 1) {
            this.setState({
              hasStylesBtns: true,
            });
          }
        });
      }
    }, ONE_SECOND);
  }

  handleClickAnswer = ({ target: { value: clickedIndex } }, correctIndex) => {
    const { timer } = this.state;
    const { dispatchSetScore, question: { difficulty } } = this.props;
    const difficultyPoints = { hard: 3, medium: 2, easy: 1 };

    // para o timer
    clearInterval(interval);

    if (Number(clickedIndex) === correctIndex) {
      // set o score se acertou no redux + Assertion +1
      dispatchSetScore(timer, difficultyPoints[difficulty]);
    }

    this.setState({
      isBtnNextVisible: true,
      hasStylesBtns: true,
      clickedAnswerIndex: clickedIndex,
    });
  }

  handleClickNextQuestion = () => {
    // fazer um question++ para proxima pergunta
    const { questionIndexNext, questionIndex, history } = this.props;
    if (questionIndex < LIMIT_QUESTIONS) {
      questionIndexNext();
      this.setState({
        isBtnNextVisible: false,
        hasStylesBtns: false,
        timer: TIMER_SEC,
        randomCorrectIndex: Math.floor(Math.random() * ANSWERS_ARRAY_SIZE),
      }, this.startTimer);
    } else {
      // quando chegar na ultima e clickar em prox sera redirecionado para feedback
      history.push('/feedback');
    }
  }

  setStylesQuestions = (isCorrect, isSelected) => (
    `answer${isCorrect ? ' correct-answer' : ' wrong-answer'}`
      + `${isSelected ? ' selected-answer' : ''}`
  )

  renderMultipleAnswers(correct, incorrectList) {
    const { randomCorrectIndex, timer, hasStylesBtns,
      isBtnNextVisible, clickedAnswerIndex } = this.state;
    const answersList = [...incorrectList];

    answersList.splice(randomCorrectIndex, 0, correct);
    return answersList.map((answer, index) => (
      <button
        onClick={ (event) => this.handleClickAnswer(event, randomCorrectIndex) }
        className={ (hasStylesBtns)
          ? this.setStylesQuestions((index === randomCorrectIndex),
            (index === Number(clickedAnswerIndex)))
          : 'answer' }
        type="button"
        disabled={ timer < 1 || isBtnNextVisible }
        key={ index }
        value={ index }
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
    const { timer, hasStylesBtns, isBtnNextVisible, clickedAnswerIndex } = this.state;

    return (
      <>
        {
          answersList.map((answer, index) => (
            <button
              type="button"
              key={ index }
              onClick={ (event) => (
                this.handleClickAnswer(event, answersList.indexOf(correct))
              ) }
              className={ (hasStylesBtns)
                ? this.setStylesQuestions((answer === correct),
                  (index === Number(clickedAnswerIndex)))
                : 'answer' }
              disabled={ timer < 1 || isBtnNextVisible }
              value={ index }
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

  renderQuestion = (correctAnswer, category, questionText, cleanQuestionText) => (
    <div className="rotated-card-1">
      <div className="rotated-card-2">
        <div className="question-card">
          <h1 className="category" data-testid="question-category">{category}</h1>
          {correctAnswer === 'Dirk the Daring'
            ? <p data-testid="question-text">{questionText}</p>
            : (
              <p
                className="question"
                data-testid="question-text"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={ { __html: cleanQuestionText } }
              />
            )}
        </div>
      </div>
    </div>
  )

  render() {
    const { question: { type, category, question: questionText,
      correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } } = this.props;
    const { timer, isBtnNextVisible } = this.state;
    const cleanQuestionText = sanitizeHtml(questionText);

    return (
      <main className="Question">
        <section className="question-container">
          {this.renderQuestion(correctAnswer, category, questionText, cleanQuestionText)}
          <div className={ `timer ${timer <= TIMER_ENDING && ' timer-ending'}` }>
            { `${timer}'` }
          </div>
        </section>

        <div className="vl" />

        <section className="buttons-container" data-testid="answer-options">
          {type === 'multiple'
            ? this.renderMultipleAnswers(correctAnswer, incorrectAnswers)
            : this.renderBoolAnswers(correctAnswer)}
          {
            (isBtnNextVisible || timer < 1) && (
              <button
                className="next-button"
                onClick={ this.handleClickNextQuestion }
                data-testid="btn-next"
                type="button"
              >
                Próxima
              </button>
            )
          }
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
  questionIndexNext: PropTypes.func.isRequired,
  questionIndex: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetScore: (timer, difficulty) => dispatch(setScore(timer, difficulty)),
});

export default connect(null, mapDispatchToProps)(Question);
