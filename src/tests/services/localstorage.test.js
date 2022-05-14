import { expect } from 'chai';
import sinon from 'sinon';

// import { getRanking } from '../../services/localstorage';

sinon.stub(window.localStorage, 'getItem').returns('undefined');
console.log(localStorage.getItem('ranking'));

describe('Funcao getRanking', () => {
  it('Deve retornar array vazio quando nao tem nada no localStorage', () => {
    expect(localStorage.getItem('ranking')).to.be.equal('undefined');
  });
});
