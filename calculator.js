const _ = require('lodash');
const {createStore} = require('redux');

const React = require('react');
const { Component } = React;
const ReactDOM = require('react-dom');

const { connect, Provider } = require('react-redux');

const { calculator } = require('./calculator-reducer.js');


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

const mapStateToDisplayProps = (state) => {
  return {
    input: state.input,
    current: state.current
  }
};


const mapDispatchToDisplayProps = (dispatch) => {
  return {}
};

const Display = ({ input, current }) => (
  <div id='output'>
    <div id='all-input'>{input}</div>
    <div id='result'>{current}</div>
  </div>
)


const DisplayComponent = connect(
  mapStateToDisplayProps,
  mapDispatchToDisplayProps
)(Display);

const mapStateToButtonProps = (state) => {
  return {}
};

const mapDispatchToButtonProps = (dispatch) => {
  return {
    onButtonClick: (type, value) => {
      dispatch({
        type: type,
        value: value
      });
    }
  }
};

const Button = ({type, className, id, value, onButtonClick}) => (
  <button
    id={id}
    className={className}
    onClick={() => onButtonClick(type, value)}
    >
    {value}
  </button>
)

const ButtonComponent = connect(
  mapStateToButtonProps,
  mapDispatchToButtonProps
)(Button);


const DigitButton = ({id, value}) => (
  <ButtonComponent type='DIGIT' className='btn digit' id={id} value={value} />
)

const OperatorButton = ({id, value}) => (
  <ButtonComponent type='OPERATOR' className='btn operator' id={id} value={value} />
)

const DotButton = ({id, value}) => (
  <ButtonComponent type='DOT' className='btn dot' id={id} value={value} />
)

const EqualButton = ({id, value}) => (
  <ButtonComponent type='EQUAL' className='btn equal' id={id} value={value} />
)

const ClearAllButton = ({id, value}) => (
  <ButtonComponent type='CLEARALL' className='btn clear' id={id} value={value} />
)

const ClearLastButton = ({id, value}) => (
  <ButtonComponent type='CLEARLAST' className='btn clear' id={id} value={value} />
)


const Buttons = ({}) => (
  <div id='input'>
    <ClearAllButton id='clear-all' value='C' />
    <ClearLastButton id='clear-last' value='CE' />
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
    <DigitButton id='empty' value='' />
    <DigitButton id='zero' value='0' />
    <DotButton id='dot' value='.' />
    <EqualButton id='equal' value='=' />
    <OperatorButton id='plus' value='+' />
  </div>
)


const Calculator = () => (
  <div>
    <DisplayComponent />
    <Buttons />
  </div>
)


ReactDOM.render(
  <Provider store={store}>
    <Calculator />
  </Provider>,
  document.getElementById('calculator')
);


// store.subscribe(render);
// render();
