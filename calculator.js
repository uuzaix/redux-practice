const _ = require('lodash');
const {createStore} = require('redux');

const React = require('react');
const { Component } = React;
const ReactDOM = require('react-dom');

const { connect, Provider } = require('react-redux');

const { calculator } = require('./calculator-reducer.js');


const store = createStore(calculator, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


const Display = ({ input, current }) => (
  <div id='output'>
    <div id='all-input'>{input}</div>
    <div id='result'>{current}</div>
  </div>
)

const Button = ({type, className, id, value, onButtonClick}) => (
  <button
    id={id}
    className={className}
    onClick={() => onButtonClick(type, value)}
  >
    {value}
  </button>
)

const DigitButton = ({id, value, onButtonClick}) => (
  <Button type='DIGIT' className='btn digit' id={id} value={value} onButtonClick={onButtonClick} />
)

const OperatorButton = ({id, value, onButtonClick}) => (
  <Button type='OPERATOR' className='btn operator' id={id} value={value} onButtonClick={onButtonClick} />
)

const DotButton = ({id, value, onButtonClick}) => (
  <Button type='DOT' className='btn dot' id={id} value={value} onButtonClick={onButtonClick} />
)

const EqualButton = ({id, value, onButtonClick}) => (
  <Button type='EQUAL' className='btn equal' id={id} value={value} onButtonClick={onButtonClick} />
)

const ClearAllButton = ({id, value, onButtonClick}) => (
  <Button type='CLEARALL' className='btn clear' id={id} value={value} onButtonClick={onButtonClick} />
)

const ClearLastButton = ({id, value, onButtonClick}) => (
  <Button type='CLEARLAST' className='btn clear' id={id} value={value} onButtonClick={onButtonClick} />
)


const Buttons = ({onButtonClick}) => (
  <div id='input'>
    <ClearAllButton id='clear-all' value='C' onButtonClick={onButtonClick} />
    <ClearLastButton id='clear-last' value='CE' onButtonClick={onButtonClick} />
    <OperatorButton id='divide' value='/' onButtonClick={onButtonClick} />
    <DigitButton id='seven' value='7' onButtonClick={onButtonClick} />
    <DigitButton id='eight' value='8' onButtonClick={onButtonClick} />
    <DigitButton id='nine' value='9' onButtonClick={onButtonClick} />
    <OperatorButton id='multiply' value='*' onButtonClick={onButtonClick} />
    <DigitButton id='four' value='4' onButtonClick={onButtonClick} />
    <DigitButton id='five' value='5' onButtonClick={onButtonClick} />
    <DigitButton id='six' value='6' onButtonClick={onButtonClick} />
    <OperatorButton id='minus' value='-' onButtonClick={onButtonClick} />
    <DigitButton id='one' value='1' onButtonClick={onButtonClick} />
    <DigitButton id='two' value='2' onButtonClick={onButtonClick} />
    <DigitButton id='three' value='3' onButtonClick={onButtonClick} />
    <DigitButton id='empty' value='' onButtonClick={onButtonClick} />
    <DigitButton id='zero' value='0' onButtonClick={onButtonClick} />
    <DotButton id='dot' value='.' onButtonClick={onButtonClick} />
    <EqualButton id='equal' value='=' onButtonClick={onButtonClick} />
    <OperatorButton id='plus' value='+' onButtonClick={onButtonClick} />
  </div>
)

const Calculator = ({input, current, onButtonClick}) => (
  <div>
    <Display input={input} current={current} />
    <Buttons onButtonClick={onButtonClick} />
  </div>
)

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: (type, value) => {
      dispatch({
        type: type,
        value: value
      });
    }
  }
};

const mapStateToProps = (state) => {
  return {
    input: state.input,
    current: state.current
  }
};

const CalculatorComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);


ReactDOM.render(
  <Provider store={store}>
    <CalculatorComponent />
  </Provider>,
  document.getElementById('calculator')
);
