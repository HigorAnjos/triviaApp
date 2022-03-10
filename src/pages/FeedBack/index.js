import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBack extends React.Component {
  render() {
    const { assertions } = this.props;
    const TREEASSERTIONS = 3;

    if (assertions < TREEASSERTIONS) {
      return (<h1 data-testid="feedback-text">Could be better...</h1>);
    }
    if (assertions > TREEASSERTIONS) {
      return (<h1 data-testid="feedback-text">Well Done!</h1>);
    }
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(FeedBack);
