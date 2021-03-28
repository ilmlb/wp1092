import React, { Component } from "react";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {done: false};
    }

    checkDone = (e) => {
        this.setState({done: !this.state.done});
        console.log(e.target, this.state.done);
    }

    render() {
        return (
            <li class="todo-app__item">
                <div class="todo-app__checkbox">
                    <input id="2" type="checkbox"/>
                    <label for="2" onClick={this.checkDone}></label>
                </div>
                <h1 class="todo-app__item-detail">{ this.props.todo }</h1>
                <img src="./img/x.png" class="todo-app__item-x"></img>
            </li>
        )
    }
}

export default Todo;