import React, { Component } from "react";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
// import TodoFooter from "../components/TodoFooter";

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {input: ""};
    }

    inputTodo = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            this.setState({input: e.target.value});
            e.target.value = "";
            
        }
    }

    render() {
        return (
            <>
                <Header text="todos" />
                <section class="todo-app__main">
                    <input class="todo-app__input" onKeyPress={ this.inputTodo }></input>
                    {/* {console.log(this.state.input)} */}
                    <TodoList add={this.state.input}/>
                </section>
                {/* <TodoFooter/> */}
            </>
        );
    }
}

export default TodoApp;
