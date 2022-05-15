import { expect } from 'chai';
import sinon from 'sinon';
import { getRanking } from '../../services/localstorage';

describe('Testing localStorage', () => {
  // ref: https://gist.github.com/davidnguyen179/ee017fb1cf6659a920b40ec721498058
  let getFunc;
  let setFunc;

  // Clone the original "localStorage"
  const originalLocalStorage = window.localStorage;

  beforeEach(() => {
    getFunc = sinon.stub();
    setFunc = sinon.stub();

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: getFunc,
        setItem: setFunc,
      },
      writable: true,
    });
  });

  afterEach(() => {
    // Revert the fake localStorage in "beforeEach" block
    Object.defineProperty(window, 'localStorage', {
      value: { ...originalLocalStorage },
      writable: true,
    });
  });

  it('Local storage deve esta mocado', () => {
    getFunc.returns('undefined');
    // Add your test related to function using "localStorage" here
    expect(localStorage.getItem('ranking')).to.be.equal('undefined');
    // Should assert or expect here to test the "getItem" is called or not
    // Jest
  });

  it('fn getRanking deve retornar um array vazio quando localstorage iniciado', () => {
    getFunc.returns(null);
    expect(getRanking()).to.be.an('array');
  });

  it('fn getRanking input json array retornar um array', () => {
    const arrayJson = '[1, 2, 3]';
    // eslint-disable-next-line no-magic-numbers
    const expected = [1, 2, 3];
    getFunc.returns(arrayJson);
    expect(getRanking()).to.deep.equal(expected);
  });
});
