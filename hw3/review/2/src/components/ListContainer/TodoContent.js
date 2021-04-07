import React, { Component } from "react";

const Todo = ({ todo }) => (
    <li className="todo-app__item">
        {/* Checkbox status control handler */}
        <div className="todo-app__checkbox" />
        <h1 className="todo-app__item-detail">
            {todo.content}
        </h1>
        {/* <img src="./img/x.png" className='todo-app__item-x'/> */}
    </li>
  );
const BuildTodoList = ({ todos }) => {
    const todoNode = todos.map(todo => <Todo todo={todo} key={todo} />);
    return (
        <ul className="todo-app__list" id="todo-list">
            {todoNode}
        </ul>
    )
}

class TodoContent extends Component {
    render() {
        return (
            <>
                <BuildTodoList todos={this.props.todos} />
            </>
        );
    }
}

export default TodoContent;