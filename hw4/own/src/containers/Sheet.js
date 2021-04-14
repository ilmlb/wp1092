import React, { Component } from "react";

class Sheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // content: this.initialSheet(),
        };
        this.inputRef = new Array(100).fill().map(() => Array(26).fill(""));
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
          if (this.props.now[0] !== -1 && this.props.now[1] !== -1 && this.inputRef[this.props.now[0]][this.props.now[1]] !== undefined) {
                this.inputRef[this.props.now[0]][this.props.now[1]].focus();
            }
        }
    }

    setContent = (t, i, j) => {
        let c = this.props.content;
        c[i][j] = t;
        this.setState({content: c});
    }

    render() {
        let sheet = new Array(this.props.content.length);
        for (let i = 0; i < this.props.content.length; ++i) {
            let row = new Array(this.props.content[0].length);
            for (let j = 0; j < this.props.content[0].length; ++j) {
                // row[j] = <Cell idx={[i, j]} text={this.props.content} pos={this.props.now} changeContent={this.setContent} focusFunc={this.props.pos}/>
                row[j] = <input type="text"
                                ref={input => this.inputRef[i][j] = input}
                                value={this.props.content[i][j]}
                                onClick={(e) => {e.target.select()}}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        if (this.props.now[0] >= 0 && this.props.now[0] < this.props.content.length - 1) {
                                            e.target.blur();
                                            this.props.pos(i + 1, j);
                                        }
                                    }
                                }}
                                onChange={(e) => this.setContent(e.target.value.trim(), i, j)}
                                onBlur={() => this.props.pos(-1,- 1)}
                                onFocus={() => this.props.pos(i, j)}/>;
            }
            sheet[i] = <div class="row">{row}</div>;
        }
        return <div class="sheet">{sheet}</div>;
    }
}

export default Sheet;