import React, { Component } from "react";
import Header from "../components/Header";
import ListContainer from './ListContainer'

class TodoApp extends Component {
    render() {
        return (
            <>
                <Header text="todos" />
                <ListContainer />
            </>
        );
    }
}

export default TodoApp;