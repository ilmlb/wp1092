import React, { Component } from "react";

class Sheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // content: this.initialSheet(),
        };
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
                row[j] = <input type="text"
                                ref={input => this.ref = input}
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