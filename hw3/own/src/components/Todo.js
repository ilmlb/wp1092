import React, { Component } from "react";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false,
        };
    }

    checkDone = (e) => {
        this.setState({done: !this.state.done});
        console.log(this.state.done);
    }

    deleteTodo = (e) => {}

    render() {
        return (
            <li class="todo-app__item">
                <div class="todo-app__checkbox">
                    <input id="2" type="checkbox" checked={this.state.done} onChange={this.checkDone}/>
                    <label for="2"/>
                </div>
                <h1 class="todo-app__item-detail" style={{textDecoration: this.state.done? "line-through":"none", opacity: this.state.done? 0.5:1}}>{ this.props.todo }</h1>
                <img src="./img/x.png" class="todo-app__item-x" onClick={this.deleteTodo}></img>
            </li>
        )
    }
}

export default Todo;