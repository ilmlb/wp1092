import React, { Component } from "react";
import Header from "../components/Header";
import Index from "../components/Index";
import Sheet from "./Sheet";

class FakeSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // header: 26,
            // index: 100,
            cursor: [0, 0],
        };
    }

    render() {
        return (
            <>
                <Sheet/>
                <Header/>
                <Index/>
                <div id="no_use"></div>
                <div class="change_column">
                    <div class="column_button">
                        <button id="add_column">+</button>
                        <button id="erase_column">-</button>
                    </div>
                </div>
                <div class="change_row">
                    <div class="row_button">
                        <button id="add_row">+</button>
                        <button id="erase_row">-</button>
                    </div>
                </div>
            </>
        );
    }
}

export default FakeSheet;

