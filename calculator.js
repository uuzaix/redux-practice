var expect = require('expect');

const calculator = (state = {input: [], current: 0}, action) => {
  switch (action.type) {
    case 'DIGIT':
      return Object.assign({}, state, {current: state.current *   10 + action.value});
    case 'OPERATOR':
      return Object.assign({}, state, {input: [...state.input, state.current, action.value], current: 0});
  }
}

const testDigit = () => {
  const stateBefore = {input: [], current: 0};
  const action = {type: 'DIGIT', value: 1};
  const stateAfter = {input: [], current: 1};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
}

const testOperator = () => {
  const stateBefore = {input: [], current: 1};
  const action = {type: 'OPERATOR', value: '+'};
  const stateAfter = {input: [1, '+'], current: 0};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
}

testDigit();
testOperator();

console.log('tests pass');
