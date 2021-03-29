import React, { Component } from "react";

class Todo extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     done: this.props.done,
        // };
    }

    // checkDone = (e) => {
    //     this.setState({done: !this.state.done});
    //     console.log(this.state.done);
    // }

    // deleteTodo = (e) => {}

    render() {
        return (
            <li class="todo-app__item">
                <div class="todo-app__checkbox">
                    <input id="2" type="checkbox" checked={this.props.done} onChange={() => {this.props.update(this.props.idx)}}/>
                    <label for="2"/>
                </div>
                <h1 class="todo-app__item-detail" style={{textDecoration: this.props.done? "line-through":"none", opacity: this.props.done? 0.5:1}}>{ this.props.content }</h1>
                <img src="./img/x.png" class="todo-app__item-x" onClick={() => {this.props.deleteTodo(this.props.idx)}}></img>
            </li>
        )
    }
}

export default Todo;