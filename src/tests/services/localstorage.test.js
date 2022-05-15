import { expect } from 'chai';
import sinon from 'sinon';

describe('Testing localStorage', () => {
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

  it('should call localStorage.getItem', () => {
    getFunc.returns(undefined);
    // Add your test related to function using "localStorage" here
    expect(localStorage.getItem('ranking')).to.be.equal(undefined);
    // Should assert or expect here to test the "getItem" is called or not
    // Jest
  });
});
