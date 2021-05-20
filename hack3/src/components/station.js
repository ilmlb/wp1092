import React, { Component } from 'react'

class Station extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }
  
  color = {'R': "red", 'G': "green", 'O': "orange", 'B': "blue"};

  render() {
    return (
      <div className="station-line-container">
        <div className="station-and-name" id={`s-${this.props.id}`}> {/* you should add both id and onClick to attributes */}
          <div className="station-rectangle">{this.props.id}</div>
          <div className={`station-name ${this.color[this.props.line]}`}>{this.props.name}</div>
        </div>
        <div className="line" id={`l-${this.props.line}`}></div> {/* you should add id to attributes */}
      </div>
    )
  }
}

export default Station
