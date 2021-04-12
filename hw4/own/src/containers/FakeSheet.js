import React, { Component } from "react";
import Header from "../components/Header";
import Index from "../components/Index";
import Sheet from "./Sheet";

class FakeSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: new Array(100).fill().map(() => Array(26).fill("")),
            // shape: [100, 26],
            cursor: [-1, -1],
        };
    }

    focusOnCell = (ro, co) => {
        this.setState({cursor: [ro, co]});
        console.log(this.state.cursor);
    }

    modifyColumn = (m) => {
        // let temp = this.state.shape[1] + m;
        // if (temp >= 0) {
        //     this.setState({shape: [this.state.shape[0], temp]});
        // }
        let c = this.state.content;
        if (this.state.cursor != [-1, -1]) {
            if (m === 1) {
                for (let i = 0; i < c.length; ++i) {
                    c[i].splice(this.state.cursor[1], 0, "");
                }
            } else {
                for (let i = 0; i < c.length; ++i) {
                    c[i].splice(this.state.cursor[1], 1);
                }
            }
        } else {
            if (m === 1) {
                for (let i = 0; i < c.length; ++i) {
                    c[i].push("");
                }
            } else {
                for (let i = 0; i < c.length; ++i) {
                    c[i].pop();
                }
            }
        }
        this.setState({content: c});
    }

    modifyRow = (m) => {
        // let temp = this.state.shape[0] + m;
        // if (temp >= 0) {
        //     this.setState({shape: [temp, this.state.shape[1]]});
        // }
        let c = this.state.content;
        if (this.state.cursor != [-1, -1]) {
            if (m === 1) {
                c.splice(this.state.cursor[0], 0, Array(c[0].length).fill(""));
            } else {
                c.splice(this.state.cursor[0], 1);
            }
        } else {
            if (m === 1) {
                c.push(Array(c[0].length).fill(""));
            } else {
                c.pop();
            }
        }
        this.setState({content: c});
    }

    render() {
        console.log(this.state.cursor);
        return (
            <>
                <Sheet content={this.state.content} pos={this.focusOnCell} now={this.state.cursor}/>
                <Header len={this.state.content[0].length} dark={this.state.cursor[1]}/>
                <Index len={this.state.content.length} dark={this.state.cursor[0]}/>
                <div id="no_use"></div>
                <div class="change_column">
                    <div class="column_button">
                        <button id="add_column" onClick={() => this.modifyColumn(1)}>+</button>
                        <button id="erase_column" onClick={() => this.modifyColumn(-1)}>-</button>
                    </div>
                </div>
                <div class="change_row">
                    <div class="row_button">
                        <button id="add_row" onClick={() => this.modifyRow(1)}>+</button>
                        <button id="erase_row" onClick={() => this.modifyRow(-1)}>-</button>
                    </div>
                </div>
            </>
        );
    }
}

export default FakeSheet;

