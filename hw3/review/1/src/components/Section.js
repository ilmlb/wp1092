import React from "react";

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.delet = this.delet.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      this.props.addArray(this.state.value);
      this.setState({ value: "" });
      event.preventDefault();
    }
  }

  onCheck(event) {
    let index = event.target.getAttribute("data-index");
    let change = this.props.array;
    change[index].check = !change[index].check;
    this.props.changeArray(change);
  }

  delet(event) {
    let index = event.target.getAttribute("data-index");
    let list = this.props.array;
    list.splice(index, 1);
    this.props.changeArray(list);
  }

  render() {
    let array = this.props.array;
    if (this.props.controllButton === "All") {
      return (
        <section onKeyPress={this.onKeyPress} className="todo-app__main">
          <input
            placeholder="What needs to be done?"
            value={this.state.value}
            onChange={this.handleChange}
            className="todo-app__input"
          />
          <ul className="todo-app__list" id="todo-list">
            {array.map((item, index) => {
              return (
                <li key={index} className="todo-app__item">
                  <div className="todo-app__checkbox">
                    <input
                      data-index={index}
                      style={item.check ? { background: "#26ca299b" } : {}}
                      onClick={this.onCheck}
                      id={index + 1}
                      type="checkbox"
                    />
                    <label
                      htmlFor={index + 1}
                      style={item.check ? { background: "#26ca299b" } : {}}
                    ></label>
                  </div>
                  <h1
                    className="todo-app__item-detail"
                    style={
                      item.check
                        ? { textDecoration: "line-through", opacity: 0.5 }
                        : {}
                    }
                  >
                    {item.text}
                  </h1>
                  <img
                    data-index={index}
                    onClick={this.delet}
                    src="./img/x.png"
                    className="todo-app__item-x"
                  />
                </li>
              );
            })}
          </ul>
        </section>
      );
    } else if (this.props.controllButton === "Active") {
      return (
        <section onKeyPress={this.onKeyPress} className="todo-app__main">
          <input
            placeholder="What needs to be done?"
            value={this.state.value}
            onChange={this.handleChange}
            className="todo-app__input"
          />
          <ul className="todo-app__list" id="todo-list">
            {array.map((item, index) => {
              if (!item.check) {
                return (
                  <li key={index} className="todo-app__item">
                    <div className="todo-app__checkbox">
                      <input
                        data-index={index}
                        style={item.check ? { background: "#26ca299b" } : {}}
                        onClick={this.onCheck}
                        id={index + 1}
                        type="checkbox"
                      />
                      <label
                        htmlFor={index + 1}
                        style={item.check ? { background: "#26ca299b" } : {}}
                      ></label>
                    </div>
                    <h1
                      className="todo-app__item-detail"
                      style={
                        item.check
                          ? { textDecoration: "line-through", opacity: 0.5 }
                          : {}
                      }
                    >
                      {item.text}
                    </h1>
                    <img
                      data-index={index}
                      onClick={this.delet}
                      src="./img/x.png"
                      className="todo-app__item-x"
                    />
                  </li>
                );
              }
            })}
          </ul>
        </section>
      );
    } else {
      return (
        <section onKeyPress={this.onKeyPress} className="todo-app__main">
          <input
            placeholder="What needs to be done?"
            value={this.state.value}
            onChange={this.handleChange}
            className="todo-app__input"
          />
          <ul className="todo-app__list" id="todo-list">
            {array.map((item, index) => {
              if (item.check) {
                return (
                  <li key={index} className="todo-app__item">
                    <div className="todo-app__checkbox">
                      <input
                        data-index={index}
                        style={item.check ? { background: "#26ca299b" } : {}}
                        onClick={this.onCheck}
                        id={index + 1}
                        type="checkbox"
                      />
                      <label
                        htmlFor={index + 1}
                        style={item.check ? { background: "#26ca299b" } : {}}
                      ></label>
                    </div>
                    <h1
                      className="todo-app__item-detail"
                      style={
                        item.check
                          ? { textDecoration: "line-through", opacity: 0.5 }
                          : {}
                      }
                    >
                      {item.text}
                    </h1>
                    <img
                      data-index={index}
                      onClick={this.delet}
                      src="./img/x.png"
                      className="todo-app__item-x"
                    />
                  </li>
                );
              }
            })}
          </ul>
        </section>
      );
    }
  }
}

export default Section;
