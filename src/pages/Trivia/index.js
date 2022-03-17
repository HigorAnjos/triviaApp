import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Question from '../../components/Question';
import { fetchToken, fetchTrivia } from '../../redux/actions';
import { getToken } from '../../services/localstorage';
import './style.css';

export class Trivia extends Component {
  state = {
    questionIndex: 0,
  }

  componentDidMount() {
    const { dispatchFetchTrivia } = this.props;
    const token = getToken();

    dispatchFetchTrivia(token);
  }

  componentDidUpdate({ token: prevToken }) {
    const { responseCode, token, dispatchFetchToken, dispatchFetchTrivia } = this.props;
    if (responseCode && prevToken === token) {
      dispatchFetchToken();
    } else if (responseCode) {
      dispatchFetchTrivia(token);
    }
  }

  questionIndexNext = () => {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
    }));
  }

  render() {
    const { questions, history } = this.props;
    const { questionIndex } = this.state;
    const isLoading = questions.length === 0;

    return (
      <>
        <Header />

        {isLoading
          ? (
            <main className="loading">
              Carregando...
            </main>
          ) : (
            <Question
              question={ questions[questionIndex] }
              questionIndex={ questionIndex }
              questionIndexNext={ this.questionIndexNext }
              history={ history }
            />
          )}
      </>
    );
  }
}

Trivia.propTypes = {
  token: PropTypes.string.isRequired,
  responseCode: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchFetchTrivia: PropTypes.func.isRequired,
  dispatchFetchToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  questions: state.trivia.questions,
  responseCode: state.trivia.responseCode,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchTrivia: (token) => dispatch(fetchTrivia(token)),
  dispatchFetchToken: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
