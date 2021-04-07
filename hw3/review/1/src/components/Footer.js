import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.all = this.all.bind(this);
    this.active = this.active.bind(this);
    this.completed = this.completed.bind(this);
    this.clear = this.clear.bind(this);
  }

  all() {
    this.props.changeControll("All");
  }

  active() {
    this.props.changeControll("Active");
  }

  completed() {
    this.props.changeControll("Completed");
  }

  clear() {
    let change = [];
    this.props.array.map((item) => {
      if (item.check !== true) {
        change.push(item);
      }
    });
    this.props.changeArray(change);
  }

  render() {
    let uncheck = 0;
    let check = 0;
    this.props.array.forEach((element) => {
      if (element.check === false) {
        uncheck++;
      } else {
        check++;
      }
    });
    return (
      <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">{uncheck} left</div>
        <ul className="todo-app__view-buttons">
          <button onClick={this.all}>All</button>
          <button onClick={this.active}>Active</button>
          <button onClick={this.completed}>Completed</button>
        </ul>
        <div className="todo-app__clean">
          <button
            onClick={this.clear}
            style={check !== 0 ? {} : { visibility: "hidden" }}
          >
            Clear completed
          </button>
        </div>
      </footer>
    );
  }
}

export default Footer;
