import React, { Component } from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.addArray = this.addArray.bind(this);
    this.changeArray = this.changeArray.bind(this);
    this.changeControll = this.changeControll.bind(this);
    this.state = { array: [], controllButton: "All" };
  }

  changeControll(button) {
    this.setState({ controllButton: button });
  }

  addArray(text) {
    this.setState({
      array: this.state.array.concat({
        check: false,
        text: text,
      }),
    });
  }

  changeArray(change) {
    this.setState({ array: change });
  }

  render() {
    if (this.state.array.length !== 0) {
      return (
        <>
          <Header text="todos" />
          <Section
            array={this.state.array}
            addArray={this.addArray}
            changeArray={this.changeArray}
            controllButton={this.state.controllButton}
          />
          <Footer
            array={this.state.array}
            changeControll={this.changeControll}
            changeArray={this.changeArray}
          />
        </>
      );
    } else {
      return (
        <>
          <Header text="todos" />
          <Section
            array={this.state.array}
            addArray={this.addArray}
            changeArray={this.changeArray}
            controllButton={this.state.controllButton}
          />
        </>
      );
    }
  }
}

export default TodoApp;
