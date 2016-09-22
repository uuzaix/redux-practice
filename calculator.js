var _ = require('lodash');

let calculator = (state = {input: [], current: '0'}, action) => {
  switch (action.type) {
    case 'DIGIT':
      if (state.current === '0') {
        return Object.assign({}, state, {current: action.value.toString()});
      } else {
        return Object.assign({}, state, {current: state.current + action.value});
      }
    case 'OPERATOR':
      if (typeof _.last(state.input) === 'string' && state.current === '0') {
      return Object.assign({}, state, {input: [...state.input.slice(0, state.input.length-1),  action.value], current: '0'});
      }
      return Object.assign({}, state, {input: [...state.input, parseInt(state.current), action.value], current: '0'});
    case 'DOT':
      if (state.current.indexOf('.') !== -1) {
        return state;
      }
      return Object.assign({}, state, {current: state.current + '.'});
    default:
      return state;
  }
}

module.exports = {
    calculator
}

console.log('calculator');
