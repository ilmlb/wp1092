import React, { Component } from "react";
// import Header from "../components/Header";

class FakeSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                {/* <Header /> */}
                <div class="row">
                    <div class="change_column">
                        <button id="add_column">+</button>
                        <button id="erase_column">-</button>
                    </div>
                </div>
                <div class="column">
                    <div class="change_row">
                        <button id="add_row">+</button>
                        <button id="erase_row">-</button>
                    </div>
                </div>
                
                {/* <Sheet> */}
            </>
        );
    }
}

export default FakeSheet;

