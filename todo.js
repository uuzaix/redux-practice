var expect = require('expect');
var { createStore } = require('redux');
var { combineReducers } = require('redux');


const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {id: action.id, text: action.text, completed: false};
    case 'TOGGLE_TODO':
      if (state.id === action.id) {
        return Object.assign({}, state, {completed: !state.completed});
      } else {
        return state;
      }
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// }

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'learn redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'learn redux',
      completed: false
    }
  ];
  expect(todos(stateBefore, action)).toEqual(stateAfter);
}

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'learn redux',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 0
  };
  const stateAfter = [
    {
      id: 0,
      text: 'learn redux',
      completed: true
    }
  ];
  expect(todos(stateBefore, action)).toEqual(stateAfter);
}

testAddTodo();
testToggleTodo();

console.log('tests pass');

const store = createStore(todoApp);

// store.subscribe(() => console.log(store.getState()));

// store.dispatch({type: 'FOO'});

// store.dispatch({
//   type: 'ADD_TODO',
//   id: 0,
//   text: 'learn redux'
// });

// store.dispatch({
//   type: 'TOGGLE_TODO',
//   id: 0
// });

// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED'
// })



var React = require('react');
var { Component } = require('react');
var ReactDOM = require('react-dom');

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
}

class FilterLink extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link 
        active={
          props.filter === state.visibilityFilter
        }
        onClick={() => 
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
      );
  }
}

const Footer = ({
  visibilityFilter,
  onFilterClick
}) => (
  <p>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL'
    >
    All
    </FilterLink>
    {' '}
    <FilterLink filter='SHOW_ACTIVE'
    >
    Active
    </FilterLink>
    {' '}
    <FilterLink filter='SHOW_COMPLETED'
    >
    Completed
    </FilterLink>
    </p>
  )
const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style= {{
      textDecoration:
        completed ?
          'line-through' : 'none'
    }}
    >
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

const AddTodo = ({
  onAddClick
}) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
        <button onClick={() => {
          onAddClick(input.value);
          input.value = '';
        }}>
        Add Todo
        </button>
      </div>
      )
}



const getVisibleTodos = (
  todos,
  filter
  ) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed) ;
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed);
  }
}

let nextTodoId = 0;

const TodoApp = ({
  todos,
  visibilityFilter
}) => (
  <div>
    <AddTodo 
      onAddClick={text => 
        store.dispatch({
          type: 'ADD_TODO',
          id:nextTodoId++,
          text
        })
      }
      />
    <TodoList
      todos={
        getVisibleTodos(
          todos,
          visibilityFilter)
      }
      onTodoClick={id=> 
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      } />
    <Footer />
  </div>
);


const render = () => {
  ReactDOM.render(
    <TodoApp 
      {...store.getState()}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
