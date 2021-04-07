import React, { Component } from "react";

const InputTodo = ({ addContent }) => {
    let inputText
    return (
      <>
        <input
            className="todo-app__input"
            placeholder="What needs to be done?"
            ref={input => inputText = input}
            onKeyPress={event => {
                if (event.key === 'Enter') {
                    addContent(inputText.value)
                }
            }}
        />
      </>
    );
  };

class TodoInput extends Component {
    render() {
        return (
            <>
                <InputTodo addContent={this.props.addContent} />
            </>
        );
    }
}

export default TodoInput;