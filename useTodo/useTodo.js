import { useEffect, useReducer } from 'react'
import { todoReducer } from '../08-useReducer/todoReducer'

const initializer = () => {
  return JSON.parse( localStorage.getItem( 'TODOS' ) ) || []
}

export const useTodo = () => {
  const [todos, dispatch] = useReducer( todoReducer, [], initializer )

  useEffect( () => {
    localStorage.setItem( 'TODOS', JSON.stringify( todos ) )
  }, [todos] )

  const handleNewTodo = ( todo ) => {
    const action = {
      type: '[TODO] Add todo',
      payload: todo,
    }

    dispatch( action )
  }

  const handleDeleteTodo = ( id ) => {
    dispatch( {
      type: '[TODO] Remove todo',
      payload: id,
    } )
  }

  const handleToggleTodo = ( id ) => {
    dispatch( {
      type: '[TODO] Toggle todo',
      payload: id,
    } )
  }

  return {
    todos,
    todosCount: todos.length,
    penddingTodos: todos.filter( todo => !todo.done ).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo
  }
}