import React from "react";
import Thead from "../components/Thead";
import Row from "../components/Row";

function FakeSheet(props){
    const Rows = (table_size) => {
        let list = []
        for(let i=0 ; i<table_size[0] ; i++)
        {
            list.push(<Row columns_num={table_size[1]} row_index={i} Focus={props.Focus} current_index={props.currentIndices[0]} key={`row-${i}`}/>)
        }
        return list;
    }
    return (
        <table className="table">
            <Thead table_size = {props.table_size} current_index={props.currentIndices[1]}/>
            <tbody>
                {Rows(props.table_size)}
            </tbody>
        </table>
    );
}

export default FakeSheet;