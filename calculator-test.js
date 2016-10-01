var expect = require('expect');
const { calculator } = require('./calculator.js');

const testDefault = () => {
  expect(calculator(undefined, {type: 'FOO'})).toEqual({input: [], current: '0'})
}

const testDigit = () => {
  let stateBefore = {input: [], current: '0'};
  let action = {type: 'DIGIT', value: 1};
  let stateAfter = {input: [], current: '1'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [], current: '0'};
  action = {type: 'DIGIT', value: 0};
  stateAfter = {input: [], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [], current: '123'};
  action = {type: 'DIGIT', value: 0};
  stateAfter = {input: [], current: '1230'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [], current: '123.'};
  action = {type: 'DIGIT', value: 0};
  stateAfter = {input: [], current: '123.0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [1, '+', 1, '='], current: '2'};
  action = {type: 'DIGIT', value: 3};
  stateAfter = {input: [], current: '3'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
}

const testOperator = () => {
  let stateBefore = {input: [], current: '1'};
  let action = {type: 'OPERATOR', value: '+'};
  let stateAfter = {input: [1, '+'], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [1, '+'], current: '1'};
  action = {type: 'OPERATOR', value: '+'};
  stateAfter = {input: [1, '+', 1, '+'], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [1, '+'], current: '0'};
  action = {type: 'OPERATOR', value: '-'};
  stateAfter = {input: [1, '-'], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [1, '+', 1, '='], current: '2'};
  action = {type: 'OPERATOR', value: '-'};
  stateAfter = {input: [2, '-'], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
}

let testDot = () => {
  let stateBefore = {input: [], current: '1'};
  let action = {type: 'DOT'};
  let stateAfter = {input: [], current: '1.'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [], current: '0'};
  action = {type: 'DOT'};
  stateAfter = {input: [], current: '0.'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [], current: '1.'};
  action = {type: 'DOT'};
  stateAfter = {input: [], current: '1.'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [], current: '1.0'};
  action = {type: 'DOT'};
  stateAfter = {input: [], current: '1.0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
}

let testEqual = () => {
  let stateBefore = {input: [1, '+'], current: '2'};
  let action = {type: 'EQUAL'};
  let stateAfter = {input: [1, '+', 2, '='], current: '3'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [], current: '1'};
  action = {type: 'EQUAL'};
  stateAfter = {input: [1, '='], current: '1'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [2.3, '-'], current: '1'};
  action = {type: 'EQUAL'};
  stateAfter = {input: [2.3, '-', 1, '='], current: '1.3'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [], current: '0'};
  action = {type: 'EQUAL'};
  stateAfter = {input: [], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [2.3, '-'], current: '1.'};
  action = {type: 'EQUAL'};
  stateAfter = {input: [2.3, '-', 1, '='], current: '1.3'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
}

let testClearAll = () => {
  let stateBefore = {input: [1, '+'], current: '2'};
  let action = {type: 'CLEARALL'};
  let stateAfter = {input: [], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [], current: '1'};
  action = {type: 'CLEARALL'};
  stateAfter = {input: [], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [1, '+'], current: '0'};
  action = {type: 'CLEARALL'};
  stateAfter = {input: [], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
}

let testClearLast = () => {
  let stateBefore = {input: [1, '+'], current: '2'};
  let action = {type: 'CLEARLAST'};
  let stateAfter = {input: [1, '+'], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [1, '+'], current: '0'};
  action = {type: 'CLEARLAST'};
  stateAfter = {input: [1, '+'], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [1, '+', 2, '='], current: '3'};
  action = {type: 'CLEARLAST'};
  stateAfter = {input: [], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {input: [], current: '2'};
  action = {type: 'CLEARLAST'};
  stateAfter = {input: [], current: '0'};
  expect(calculator(stateBefore, action)).toEqual(stateAfter);
}

testDefault();
testDigit();
testOperator();
testDot();
testEqual();
testClearAll();
testClearLast();

console.log('tests pass');

