import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchAPI from '../../services/trivia';
import './style.css';
import { setCategory, setDifficulty, setType } from '../../redux/actions';

const difficultyObj = [
  { value: '', name: 'Todas' },
  { value: 'easy', name: 'Fácil' },
  { value: 'medium', name: 'Médio' },
  { value: 'hard', name: 'Difícil' },
];

const typeObj = [
  { value: '', name: 'Todos' },
  { value: 'boolean', name: 'Verdadeiro ou Falso' },
  { value: 'multiple', name: 'Múltipla Escolha' },
];

export class Configuration extends Component {
  constructor({ category, difficulty, type }) {
    super();
    this.state = {
      categories: [],
      category,
      difficulty,
      type,
    };
  }

  async componentDidMount() {
    const { trivia_categories: categoriesFetched } = await fetchAPI('https://opentdb.com/api_category.php');
    const categories = [{ name: 'Todas', id: '' }, ...categoriesFetched];
    this.setState({
      categories,
    });
  }

  handleChange = ({ target: { id, value } }) => {
    const { dispatchSetCategory, dispatchSetDifficulty, dispatchSetType } = this.props;
    switch (id) {
    case 'category':
      dispatchSetCategory(value);
      break;
    case 'difficulty':
      dispatchSetDifficulty(value);
      break;
    case 'type':
      dispatchSetType(value);
      break;
    default:
      break;
    }
    this.setState({
      [id]: value,
    });
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { categories, category, difficulty, type } = this.state;

    return (
      <main className="Configuration">
        <section className="title-container">
          <h1 className="config-title">
            Configurações
          </h1>
          <button
            className="home-button"
            data-testid="btn-go-home"
            type="button"
            onClick={ this.handleClick }
          >
            Início
          </button>
        </section>
        <section className="config-container">
          <label className="config-label" htmlFor="category">
            Categoria
            <select
              className="config-select"
              id="category"
              onChange={ this.handleChange }
              value={ category }
            >
              {categories.map(({ name, id }) => (
                <option key={ id } value={ id }>{name}</option>
              ))}
            </select>
          </label>

          <label className="config-label" htmlFor="difficulty">
            Dificuldade
            <select
              className="config-select"
              id="difficulty"
              onChange={ this.handleChange }
              value={ difficulty }
            >
              {difficultyObj.map(({ name, value }) => (
                <option key={ value } value={ value }>{name}</option>
              ))}
            </select>
          </label>

          <label className="config-label" htmlFor="type">
            Tipo de Questão
            <select
              className="config-select"
              id="type"
              onChange={ this.handleChange }
              value={ type }
            >
              {typeObj.map(({ name, value }) => (
                <option key={ value } value={ value }>{name}</option>
              ))}
            </select>
          </label>
        </section>
      </main>
    );
  }
}

Configuration.propTypes = {
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchSetCategory: PropTypes.func.isRequired,
  dispatchSetDifficulty: PropTypes.func.isRequired,
  dispatchSetType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.configs.category,
  difficulty: state.configs.difficulty,
  type: state.configs.type,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetCategory: (category) => dispatch(setCategory(category)),
  dispatchSetDifficulty: (difficulty) => dispatch(setDifficulty(difficulty)),
  dispatchSetType: (type) => dispatch(setType(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
