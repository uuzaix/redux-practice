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
  id
}) => (
  <button 
  onClick={() => {
      store.dispatch({
        type: type,
        value: id
      });
    }}
  >
  {id}
  </button>
  )

const DigitButton = ({id}) => (
    <Button type='DIGIT' id={id} />
)

const OperatorButton = ({id}) => (
    <Button type='OPERATOR' id={id} />
)

const DotButton = ({id}) => (
  <Button type='DOT' id={id} />
)

const EqualButton = ({id}) => (
  <Button type='EQUAL' id={id} />
)

const ClearAllButton = ({id}) => (
  <Button type='CLEARALL' id={id} />
)

const ClearLastButton = ({id}) => (
  <Button type='CLEARLAST' id={id} />
)

const Display = ({
  data
}) =>
  (
    <div>
      <p>{data.input}</p>
      <p>{data.current}</p>
    </div>
  )

const Buttons = ({}) =>
  (
    <div>
      <DigitButton id= '1' />
      <DigitButton id= '2' />
      <DigitButton id= '3' />
      <DigitButton id= '4' />
      <DigitButton id= '5' />
      <DigitButton id= '6' />
      <DigitButton id= '7' />
      <DigitButton id= '8' />
      <DigitButton id= '9' />
      <DigitButton id= '0' />
      <OperatorButton id='-' />
      <OperatorButton id='+' />
      <OperatorButton id='/' />
      <OperatorButton id='*' />
      <DotButton id='.'/>
      <EqualButton id='='/>
      <ClearAllButton id='C'/>
      <ClearLastButton id='CE'/>
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
