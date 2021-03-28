import React, { Component } from "react";
import Todo from "./Todo";

class TodoList extends Component {
    constructor(props) {
        // console.log("called");
        super(props);
        this.state = {todo: []};
    }

    static getDerivedStateFromProps(props, state) {
        // const {add} = props;
        if (props.add.length > 0) {
            return {todo: [...state.todo, <Todo todo={props.add}/>]};
        }
    }

    render() {
        return this.state.todo;
    }
}

export default TodoList;