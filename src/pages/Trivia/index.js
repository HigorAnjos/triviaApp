import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken, setToken } from '../../services/localstorage';

import Header from '../../components/Header';
import { fetchToken, successFetchingToken } from '../../redux/actions';
import Question from '../../components/Question';

export class Trivia extends Component {
  componentDidMount() {
    const { dispatchSetToken, dispatchFetchToken } = this.props;
    const token = getToken();
    if (!token) {
      dispatchFetchToken();
    } else {
      dispatchSetToken(token);
    }
  }

  componentDidUpdate() {
    const { token } = this.props;
    if (token !== getToken()) {
      setToken(token);
    }
  }

  render() {
    const { token } = this.props;

    return (
      <div>
        <Header />
        <Question token={ token } />
      </div>
    );
  }
}

Trivia.propTypes = {
  token: PropTypes.string,
  dispatchFetchToken: PropTypes.func.isRequired,
  dispatchSetToken: PropTypes.func.isRequired,
};

Trivia.defaultProps = {
  token: '',
};

const mapStateToProps = (state) => ({
  token: state.token.value,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchToken: () => dispatch(fetchToken()),
  dispatchSetToken: (token) => dispatch(successFetchingToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
