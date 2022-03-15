import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { connect } from 'react-redux';
import { setScore } from '../../redux/actions';
import './style.css';

const ANSWERS_ARRAY_SIZE = 4;
const CORRECT_ANSWER = 'correct-answer';
const ONE_SECOND = 1000;
const LIMIT_QUESTIONS = 4;
let interval;

class Question extends React.Component {
  state = {
    timer: 30,
    randomCorrectIndex: Math.floor(Math.random() * ANSWERS_ARRAY_SIZE),
    isBtnNextVisible: false,
    hasStylesBtns: false,
  };

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    this.setState({
      timer: 30,
    });
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
      // parar o timer
      clearInterval(interval);
      // set o score se acertou no redux + Assertion +1
      dispatchSetScore(timer, difficultyPoints[difficulty]);
    }

    this.setState({
      isBtnNextVisible: true,
      hasStylesBtns: true,
    });
  }

  handleClickNextQuestion = () => {
    // fazer um question++ para proxima pergunta
    console.log(this.props);
    const { questionIndexNext, questionIndex, history } = this.props;
    if (questionIndex < LIMIT_QUESTIONS) {
      questionIndexNext();
      this.setState({
        isBtnNextVisible: false,
        hasStylesBtns: false,
        timer: 30,
      }, this.startTimer);
    } else {
      // quando chegar na ultima e clickar em prox sera redirecionado para feedback
      history.push('/feedback');
    }
  }

  setStylesQuestions = (answer) => {
    if (answer) {
      return 'unselected-answer correct-answer';
    }
    return 'unselected-answer wrong-answer';
  }

  renderMultipleAnswers(correct, incorrectList) {
    const { randomCorrectIndex, timer, hasStylesBtns } = this.state;
    const answersList = [...incorrectList];

    answersList.splice(randomCorrectIndex, 0, correct);
    return answersList.map((answer, index) => (
      <button
        className={ (hasStylesBtns)
          ? this.setStylesQuestions((index === randomCorrectIndex))
          : 'unselected-answer' }
        type="button"
        onClick={ this.handleClickAnswer }
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
    const { timer, hasStylesBtns } = this.state;

    return (
      <>
        {
          answersList.map((answer, index) => (
            <button
              type="button"
              key={ index }
              onClick={ this.handleClickAnswer }
              className={ (hasStylesBtns)
                ? this.setStylesQuestions((answer === correct))
                : 'unselected-answer' }
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
    const { timer, isBtnNextVisible } = this.state;
    const cleanQuestionText = sanitizeHtml(questionText);

    return (
      <main className="Question">
        <section className="question-container">
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
        </section>

        <div className="vl" />

        <section className="buttons-container" data-testid="answer-options">
          <div className="timer">
            { timer }
          </div>
          <div className="answers-container">
            {type === 'multiple'
              ? this.renderMultipleAnswers(correctAnswer, incorrectAnswers)
              : this.renderBoolAnswers(correctAnswer)}
          </div>
          <div>
            {
              isBtnNextVisible && (
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
