import React, { Component } from 'react'
import Station from './station'

class RouteGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }

  render() {
    const data = this.props.route_data

    return (
      <div className="route-graph-container">
        {
          // generate many stations
          // use <Station /> with your own customized parameters
          // coding here ...
          data.map((v, i) => {
            <Station id={v["station_id"]} name={v["station_name"] } line={v["station_type"]}/>
          })
        }
      </div>
    )
  }
}

export default RouteGraph
