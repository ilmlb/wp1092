import React from "react";

function Thead(props){
    const IndexCreator = (i) => {
        let a_code = 'A'.charCodeAt(0);
        let output = "";
        let remain = i % 26;
        output = output.concat(String.fromCharCode(a_code + remain));
        i = Math.floor(i / 26);
        while(i > 0){
            remain = i % 26;
            if(i === 26)
            {
                i = 0;
                remain = 26;
            }
            output = output.concat(String.fromCharCode(a_code + remain - 1));
            i = Math.floor(i / 26);
        }
        return output.split("").reverse().join("");
    }
    const ColumnsList = (columns_num) => {
        let list = [];
        list.push(<th className = "block" key={`blockmark`}> </th>);
        for(let i=0 ; i<columns_num ; i++)
        {
            let className = "block text_center indices_mark";
            if(props.current_index === i)
                className = className.concat(" marked");

            list.push(<th className = {className} key={`columnmark-${i}`}>{IndexCreator(i)}</th>);
        }
        return list;
    }
    return(
        <thead className="thead">
            <tr>
                {ColumnsList(props.table_size[1])}
            </tr>
        </thead>
    );
}

export default Thead;