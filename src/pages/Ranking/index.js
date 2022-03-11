import React, { Component } from 'react';
import PropTypes from 'prop-types';
export class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <main>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClick }
        >
          inicio
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
