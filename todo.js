const expect = require('expect');

const { combineReducers, createStore } = require('redux');

const React = require('react');
const { Component } = React;

const ReactDOM = require('react-dom');

const { connect, Provider } = require('react-redux');

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


//action creators
let nextTodoId = 0;
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id:nextTodoId++,
    text
  };
};
const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};
const togleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

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

const mapStateToLinkProps = (
  state,
  ownProps
) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch(
        setVisibilityFilter(ownProps.filter));
    }
  };
}

const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);

const Footer = () => (
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



let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
        <button onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}>
        Add Todo
        </button>
      </div>
      )
}

AddTodo = connect()(AddTodo);

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

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
      )
  }
}
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(togleTodo(id));
    } 
  };
};
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);



const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);




ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
