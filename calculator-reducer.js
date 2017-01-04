const _ = require('lodash');

let calculator = (state = { input: [], current: '0' }, action) => {
  switch (action.type) {
    case 'DIGIT':
      if (state.current.length < 8 && (state.input.join('').length + state.current.length) < 20) {
        if (state.current === '0') {
          return Object.assign({}, state, { current: action.value.toString() });
        } else if (_.last(state.input) === '=') {
          return Object.assign({}, { input: [], current: action.value.toString() });
        } else {
          return Object.assign({}, state, { current: state.current + action.value });
        }
      }
      return state;

    case 'OPERATOR':
      if (_.last(state.input) === '=') {
        return Object.assign({}, { input: [parseFloat(state.current), action.value], current: '0' });
      }
      if ((state.input.join('').length + state.current.length) < 17) {
        if (typeof _.last(state.input) === 'string' && state.current === '0') {
          return Object.assign({}, state, { input: [...state.input.slice(0, state.input.length - 1), action.value], current: '0' });
        }
        return Object.assign({}, state, { input: [...state.input, parseFloat(state.current), action.value], current: '0' });
      }
      return state;

    case 'DOT':
      if (state.current.length < 7 && (state.input.join('').length + state.current.length) < 19) {
        if (_.last(state.input) === '=') {
          return Object.assign({}, { input: [], current: '0.' });
        }
        else {
          if (state.current.indexOf('.') !== -1) {
            return state;
          }
          return Object.assign({}, state, { current: state.current + '.' });
        }
      } return state;

    case 'EQUAL':
      if (state.input.length === 0 && state.current !== '0' || _.last(state.input) === '=') {
        return Object.assign({}, state, { input: [parseFloat(state.current), '='] });
      }
      if (state.input.length !== 0) {
        let current = eval([...state.input, parseFloat(state.current)].join(''));
        if (current.toString().indexOf('.') !== -1) {
          current = current.toFixed(8);
          while (current.endsWith("0")) {
            current = current.substring(0, current.length - 1);
          }
        }
        return Object.assign({}, state, { input: [...state.input, parseFloat(state.current), '='], current: current.toString() })
      } else {
        return state;
      }


    case 'CLEARALL':
      return { input: [], current: '0' };

    case 'CLEARLAST':
      if (_.last(state.input) === '=') {
        return { input: [], current: '0' };
      }
      return Object.assign({}, state, { current: '0' });

    default:
      return state;
  }
}

module.exports = { calculator };