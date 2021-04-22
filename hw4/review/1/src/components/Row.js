import React from "react";
import Cell from "./Cell";

function Row(props){
    const RowsList = (columns_num, row_index) => {
        let list = [];
        let className = "block text_center indices_mark";
        if(props.current_index===row_index)
            className = className.concat(" marked");

        list.push(<td className={className} key={`rowmark-${row_index}`}>{row_index+1}</td>);
        for(let i=0 ; i<columns_num ; i++)
        {
            list.push(<Cell indices={[row_index, i]} Focus={props.Focus} key={`cell-${row_index}-${i}`}/>);
        }
        return list;
    }
    return(
        <tr className="row">
            {RowsList(props.columns_num, props.row_index)}
        </tr>
    );
}

export default Row;