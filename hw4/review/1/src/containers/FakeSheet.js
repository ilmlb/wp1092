import React, { useState } from "react";
import Table from "../components/Table";

function FakeSheet(){
    const [table_size, setSize] = useState([100, 26]);
    const [values, setValues] = useState(Array.from(Array(table_size[0]), () => Array.from(Array(table_size[1]), () => '')));
    const [currentIndices, setIndices] = useState([-1, -1]);

    const getValues = () => {
        let newValues = Array.from(Array(table_size[0]), () => Array.from(Array(table_size[1]), () => ''));
        for(let i=0 ; i<table_size[0] ; i++)
        {
            for(let j=0 ; j<table_size[1] ; j++)
            {
                newValues[i][j] = document.getElementById(`${i}-${j}`).value;
            }
        }
        return newValues;
    }

    const GiveValues = () => {
        for(let i=0 ; i<table_size[0] ; i++)
        {
            for(let j=0 ; j<table_size[1] ; j++)
            {
                document.getElementById(`${i}-${j}`).value = values[i][j];
            }
        }
    }

    const ChangeRows = (sign) => {
        let newValues = getValues();
        let row_index = currentIndices[0];
        if(row_index === -1)
            row_index = table_size[0];
        if(sign === "+"){
            setSize([table_size[0]+1, table_size[1]]);

            let newRow = Array.from(Array(table_size[1]),()=>'');
            newValues.splice(row_index,0,newRow);
        }else{
            if(row_index === table_size[0])
                return;
            setSize([table_size[0]-1, table_size[1]]);

            newValues.splice(row_index,1);
        }
        setValues(newValues);

        if(row_index !== table_size[0])
            Focus(currentIndices);
    }

    const ChangeColumns = (sign) => {
        let newValues = getValues();
        let column_index = currentIndices[1];
        if(column_index === -1)
            column_index = table_size[1];
        if(sign === "+"){
            setSize([table_size[0], table_size[1]+1]);
            
            for(let i=0 ; i< table_size[0]; i++)
                newValues[i].splice(column_index,0,'');
        }else{
            if(column_index === table_size[1])
                return;
            setSize([table_size[0], table_size[1]-1]);

            for(let i=0 ; i< table_size[0]; i++)
                newValues[i].splice(column_index,1);
        }
        setValues(newValues);

        if(column_index !== table_size[1])
            Focus(currentIndices);
    }

    const Focus = (indices) =>{
        // console.log("table", indices);
        if(indices === null){
            setIndices([-1, -1]);
        }else if(-1 < indices[0] && indices[0] < table_size[0] && -1 < indices[1] && indices[1] < table_size[1]){
            setIndices(indices);
            document.getElementById(`${indices[0]}-${indices[1]}`).focus();
        }
    }

    const Refocus = () => {
        if(currentIndices !== null)
        {
            if(document.getElementById(`${currentIndices[0]}-${currentIndices[1]}`) !== null)
            {
                document.getElementById(`${currentIndices[0]}-${currentIndices[1]}`).focus();
            }else{
                Focus(null);
            }
        }
    }

    return (
        <div className="vertical background">
            <div className="horizontal bar">
                <button onMouseDown={() => ChangeColumns("+")} onFocus={Refocus} onClick={GiveValues}>+</button>
                <button onMouseDown={() => ChangeColumns("-")} onFocus={Refocus} onClick={GiveValues}>-</button>
            </div>
            <div className="horizontal">
                <div className="vertical bar">
                    <button onMouseDown={() => ChangeRows("+")} onFocus={Refocus} onClick={GiveValues}>+</button>
                    <button onMouseDown={() => ChangeRows("-")} onFocus={Refocus} onClick={GiveValues}>-</button>
                </div>
                <Table table_size={table_size} Focus={Focus} currentIndices={currentIndices}/>
            </div>
        </div>
    );
}

export default FakeSheet;