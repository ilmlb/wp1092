import React, { Component } from "react";

class TodoFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {left: 0}
    }

    render() {
        return (
            <footer class="todo-app__footer" id="todo-footer" style={{visibility: this.state.left? "visible":"hidden"}}>
                <div class="todo-app__total">{this.state.left} left</div>
                <ul class="todo-app__view-buttons">
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </ul>
                <div class="todo-app__clean">
                    <button>Clear completed</button>
                </div>
            </footer>
        )        
    }
}

export default TodoFooter;