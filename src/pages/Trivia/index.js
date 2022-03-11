import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import { fetchToken, fetchTrivia } from '../../redux/actions';
import Question from '../../components/Question';

export class Trivia extends Component {
  state = {
    questionIndex: 0,
  }

  componentDidMount() {
    const { dispatchFetchTrivia } = this.props;
    dispatchFetchTrivia(token);
  }

  componentDidUpdate({ token: prevToken }) {
    const { responseCode, token, dispatchFetchToken, dispatchFetchTrivia } = this.props;
    if (responseCode && token === prevToken) {
      dispatchFetchToken();
    } else if (token !== prevToken) {
      dispatchFetchTrivia(token);
    }
  }

  render() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const isLoading = questions.length === 0;

    return (
      <div>
        <Header />

        {isLoading
          ? (
            <main>
              Carregando...
            </main>
          ) : (
            <Question question={ questions[questionIndex] } />
          )}
      </div>
    );
  }
}

Trivia.propTypes = {
  token: PropTypes.string.isRequired,
  responseCode: PropTypes.number.isRequired,
  questions: PropTypes.shape([]).isRequired,
  dispatchFetchTrivia: PropTypes.func.isRequired,
  dispatchFetchToken: PropTypes.func.isRequired,
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
