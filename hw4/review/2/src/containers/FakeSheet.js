import React, { Component, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";

class FakeSheet extends Component {


    render() {
        return (
            <>
                <Header title="Spreadsheet"/>
                <Table id="table" col="26" row="100" />
            </>
        );
    }
}

export default FakeSheet;

