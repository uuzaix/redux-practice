var _ = require('lodash');
var {createStore} = require('redux');

var React = require('react');
var { Component } = require('react');
var ReactDOM = require('react-dom');


let calculator = (state = {input: [], current: '0'}, action) => {
  switch (action.type) {
    case 'DIGIT':
      if (state.current === '0') {
        return Object.assign({}, state, {current: action.value.toString()});
      } else if (_.last(state.input) === '=') {
        return Object.assign({}, {input: [], current: action.value.toString()});
      } else {
        return Object.assign({}, state, {current: state.current + action.value});
      }

    case 'OPERATOR':
      if (typeof _.last(state.input) === 'string' && state.current === '0') {
        return Object.assign({}, state, {input: [...state.input.slice(0, state.input.length-1),  action.value], current: '0'});
      }
      else if (_.last(state.input) === '=') {
        return Object.assign({}, {input: [parseFloat(state.current), action.value], current: '0'});
      }
      return Object.assign({}, state, {input: [...state.input, parseFloat(state.current), action.value], current: '0'});

    case 'DOT':
      if (state.current.indexOf('.') !== -1) {
        return state;
      }
      return Object.assign({}, state, {current: state.current + '.'});

    case 'EQUAL':
      if (state.input.length === 0 && state.current !== '0') {
        return Object.assign({}, state, {input: [parseFloat(state.current), '=']});
      }
      if (state.input.length !== 0) {
        let current = eval([...state.input, parseInt(state.current)].join(''));
        if (current.toString().indexOf('.') !== -1) {
          current = current.toFixed(8);
          while (current.endsWith("0")) {
            current = current.substring(0, current.length-1);
          }
        }
        return Object.assign({}, state, {input: [...state.input, parseFloat(state.current), '='], current: current.toString()})
      } else {
        return state;
      }

    case 'CLEARALL':
      return {input: [], current: '0'};

    case 'CLEARLAST':
      if (_.last(state.input) === '=') {
        return {input: [], current: '0'};
      }
      return Object.assign({}, state, {current: '0'});

    default:
      return state;
  }
}

module.exports = {
    calculator
};

const store = createStore(calculator);

// store.subscribe(() => console.log(store.getState()));

// store.dispatch({type: 'DIGIT', value: 1});
// store.dispatch({type: 'DOT'});
// store.dispatch({type: 'DIGIT', value: 3});
// store.dispatch({type: 'OPERATOR', value: '+'});
// store.dispatch({type: 'DIGIT', value: 2});
// store.dispatch({type: 'CLEARLAST'});
// store.dispatch({type: 'DIGIT', value: 5});
// store.dispatch({type: 'EQUAL'});
// store.dispatch({type: 'CLEARALL'});

class Calculator extends React.Component {
  render() {
    return (
      <div>
        <Display data={this.props} />
        <Buttons />
      </div>
    );
  }
}

const Button = ({
  type,
  id,
  value
}) => (
  <button id={id} className="btn digit"
  onClick={() => {
      store.dispatch({
        type: type,
        value: value
      });
    }}
  >
  {value}
  </button>
  )

const DigitButton = ({id, value}) => (
    <Button type='DIGIT' id={id} value={value} />
)

const OperatorButton = ({id, value}) => (
    <Button type='OPERATOR' id={id} value={value} />
)

const DotButton = ({id, value}) => (
  <Button type='DOT' id={id} value={value} />
)

const EqualButton = ({id, value}) => (
  <Button type='EQUAL' id={id} value={value} />
)

const ClearAllButton = ({id, value}) => (
  <Button type='CLEARALL' id={id} value={value} />
)

const ClearLastButton = ({id, value}) => (
  <Button type='CLEARLAST' id={id} value={value} />
)

const Display = ({
  data
}) =>
  (
    <div id='output'>
      <div id='all-input'>{data.input}</div>
      <div id='result'>{data.current}</div>
    </div>
  )

const Buttons = ({}) =>
  (
    <div id='input'>
      <ClearAllButton id='clear-all' value='C'/>
      <ClearLastButton id='clear-last' value='CE'/>
      <OperatorButton id='divide' value='/' />
      <DigitButton id='seven' value='7' />
      <DigitButton id='eight' value='8' />
      <DigitButton id='nine' value='9' />
      <OperatorButton id='multiply' value='*' />
      <DigitButton id='four' value='4' />
      <DigitButton id='five' value='5' />
      <DigitButton id='six' value='6' />
      <OperatorButton id='minus' value='-' />
      <DigitButton id='one' value='1' />
      <DigitButton id='two' value='2' />
      <DigitButton id='three' value='3' />
      <DigitButton id='zero' value='0' />
      <DotButton id='dot' value='.'/>
      <EqualButton id='equal' value='='/>
      <OperatorButton id='plus' value='+' />
    </div>
    )

const render = () => {
  ReactDOM.render(
    <Calculator 
    {...store.getState()}
    />,
    document.getElementById('calculator')
  );
};

store.subscribe(render);
render();
