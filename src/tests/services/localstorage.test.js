import { expect } from 'chai';
import sinon from 'sinon';

// import { expect } from "chai";

// import { getRanking } from '../../services/localstorage';

// sinon.stub(window.localStorage, 'getItem').returns('undefined');
// console.log(localStorage.getItem('ranking'));

describe('Funcao getRanking', () => {
  // it('Deve retornar array vazio quando nao tem nada no localStorage', () => {
  //   expect(localStorage.getItem('ranking')).to.be.equal('undefined');
  // });

  // it('coisa', () => {
  //   // window.localStorage.setItem
  //   const spy = sinon.spy(window.localStorage, 'setItem');

  //   // You can use this in your assertions
  //   spy.calledWith('ranking', 'undefined');

  //   expect(localStorage.getItem('ranking')).to.be.equal('undefined');
  //   // Reset localStorage.setItem method
  //   spy.reset();
  // });
  it('Localstorage to be undefined', () => {
    // moca sinon localstorage
    // const spy = sinon.spy(window.localStorage, 'getItem');
    // const spy = sinon.stub(localStorage, 'getItem').returns('undefined');
    // sinon.stub(localStorage, 'getItem').returns('undefined');

    // spy.alwaysCalledOn(window.localStorage);
    // spy.alwaysCalledWith('ranking', 'undefined');

    // expect(localStorage.getItem('ranking')).to.be.equal('undefined');
    // Reset localStorage.setItem method
    // spy.reset();
  });

  // it('Jest localstorage', () => {
  //   // jest moca localstorage
  //   global.window.localStorage.getItem = jest.fn().mockReturnValue('undefined');
  //   expect(localStorage.getItem('')).to.be.equal('undefined');
  // });
  // npm run jest -- --coverage
});
