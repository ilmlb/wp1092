import React, { Component } from "react";

class TodoFooter extends Component {
    render() {
        return (
            <>
                <ul className="todo-app__footer" id="todo-footer">
                    <div className="todo-app__total">{this.props.todoLength} left</div>
                    <ul className="todo-app__view-buttons">
                        <button id="all">All</button>
                        <button id="active">Active</button>
                        <button id="completed">Completed</button>
                    </ul>
                    <div className="todo-app__clean">
                        <button id="clean">Clear completed</button>
                    </div>

                </ul>
            </>
        );
    }
}

export default TodoFooter;