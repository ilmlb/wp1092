import React, { Component } from 'react'

class StationInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: [
        { label: '車站名稱', value: 'station_name' },
        { label: '車站位址', value: 'address' },
        { label: '詢問處位置', value: 'service_counter' },
        { label: '自行車進出', value: 'enable_bicycle' }
      ]
    }
  }

  render() {
    return (
      <div className="station-info-container">
        <table className="station-info-table">
          <thead>
            <tr>
              <th colSpan="2">車站資訊</th>
            </tr>
          </thead>
          <tbody>
            {
              // generate multiple
              //   <tr>
              //     <td></td>
              //     <td></td>
              //   </tr>
              // coding here ...
              <>
                <tr>
                  <td>{this.state.labels[0]["label"]}</td>
                  <td>{this.state.labels[0]["value"]}</td>
                </tr>
                <tr>
                  <td>{this.state.labels[1]["label"]}</td>
                  <td>{this.state.labels[1]["value"]}</td>
                </tr>
                <tr>
                  <td>{this.state.labels[2]["label"]}</td>
                  <td>{this.state.labels[2]["value"]}</td>
                </tr>
                <tr>
                  <td>{this.state.labels[3]["label"]}</td>
                  <td>{this.state.labels[3]["value"]}</td>
                </tr>
              </>
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default StationInfo
