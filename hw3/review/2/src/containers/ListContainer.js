import React, { Component } from "react";
import TodoInput from '../components/ListContainer/TodoInput'
import TodoContent from '../components/ListContainer/TodoContent'
import TodoFooter from '../components/ListContainer/TodoFooter'

class ListContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            todos: []   
        }
    }

    addContent(content) {
        const todoLength = this.state.todos.length
        this.state.todos.push({
          content,
          id: todoLength + 1,
          status: false
        })
        this.setState({ todos: this.state.todos })
    }
    render() {
        return (
            <>
                <section className="todo-app__main">
                    <TodoInput
                        addContent={this.addContent.bind(this)}
                    />
                    <TodoContent
                        todos={this.state.todos}
                    />
                    <TodoFooter
                        todoLength={this.state.todos.length}
                    />
                </section>
            </>
        );
    }
}

export default ListContainer;