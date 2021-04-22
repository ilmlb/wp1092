import React, { useState, useEffect, useRef } from "react";

export default (props) => {
	const [colNumber, setColNumber] = useState(parseInt(props.col));
    const [rowNumber, setRowNumber] = useState(parseInt(props.row));
    const [target, setTarget] = useState({row: rowNumber, col: colNumber});
    const [clickState, setClickState] = useState("none");
    const tableRef = useRef();
    const inputRef = useRef([]);

    function handleClick(event) {
        event.preventDefault();
        setClickState("none");
        setTarget({row: rowNumber, col: colNumber});
    } 

    function handleKeyUp(event) {
        event.preventDefault();
        if (clickState === "select" && (event.key === "Enter" || event.keyCode === 13)) {
            inputRef.current[target.row * colNumber + target.col].blur();
            let newTarget = {row: (target.row === rowNumber - 1)? target.row :target.row + 1, col: target.col};
            setTarget(newTarget);
            inputRef.current[newTarget.row * colNumber + newTarget.col].focus();
        }
    }

    useEffect(() => {
        if (window) {
            window.addEventListener("click", handleClick);
            window.addEventListener("keyup", handleKeyUp);
            return () => {
                window.removeEventListener("click", handleClick);
                window.removeEventListener("keyup", handleKeyUp);
            };
        }
    }, [handleClick, handleKeyUp]);

    function select(row, col) {
        setTarget({row, col});
        setClickState("select");
    }

    function deleteData(type) {  //type: 0(row+), 1(row-), 2(col+), 3(col-)
        if (type === 0) {
            if (clickState === "select") {
                for (var i = rowNumber - 2; i >= target.row; i--) {
                    for (var j = 0; j < colNumber; j++) {
                        inputRef.current[(i + 1) * colNumber + j].value = inputRef.current[i * colNumber + j].value;
                        if (i == target.row) inputRef.current[i * colNumber + j].value = "";
                    }
                }
                setTarget({row: target.row + 1, col: target.col});
                inputRef.current[(target.row + 1) * colNumber + target.col].focus();
            }
            setRowNumber(rowNumber + 1);
        } else if (type === 1) {
            if (clickState === "select") {
                for (var i = target.row; i < rowNumber - 1; i++) {
                    for (var j = 0; j < colNumber; j++) {
                        inputRef.current[i * colNumber + j].value = inputRef.current[(i + 1) * colNumber + j].value;
                    }
                }
                setRowNumber(rowNumber - 1);
                setClickState("none");
                setTarget({row: rowNumber, col: colNumber});
            }
        } else if (type === 2) {
            if (clickState === "select") {
                for (var i = colNumber - 2; i >= target.col; i--) {
                    for (var j = 0; j < rowNumber; j++) {
                        inputRef.current[j * colNumber + i + 1].value = inputRef.current[j * colNumber + i].value;
                        if (i == target.col) inputRef.current[j * colNumber + i].value = "";
                    }
                }
                setTarget({row: target.row, col: target.col + 1});
                inputRef.current[target.row * colNumber + target.col + 1].focus();
            }
            setColNumber(colNumber + 1);
        } else if (type === 3) {
            if (clickState === "select") {
                for (var i = target.col; i < colNumber - 1; i++) {
                    for (var j = 0; j < rowNumber; j++) {
                        inputRef.current[j * colNumber + i].value = inputRef.current[j * colNumber + i + 1].value;
                    }
                }
                setColNumber(colNumber - 1);
                setClickState("none");
                setTarget({row: rowNumber, col: colNumber});
            }
        }
    }

    var temp = [];
    for (var i = 1; i < colNumber; i++) temp[i] = 0; 

    function colMaker() {
        var list = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        if (colNumber <= 26) list = list.slice(0, colNumber);
        else {
            var ptr = [0, 0];
            for (var i = 26; i < colNumber; i++) {
                list[i] = "";
                for (var j = 0; j < ptr.length; j++) list[i] = list[ ptr[j] ] + list[i];
                var p = 0;
                ptr[p] += 1;
                while (ptr[p] === 26) {
                    ptr[p + 1] = (p + 1 == ptr.length)? 0: ptr[p + 1] + 1;
                    ptr[p++] = 0;
                }
            }
        }
        return list.map((e, index) => (
            <th id="table_col_block" style={{backgroundColor: (index === target.col)? "#D0D0D0": "#FCFCFC"}} >{e}</th>));
    }

    function dataMaker(row) {
        var list = [];
        for (var i = 0; i < colNumber; i++) list[i] = {row, col: i};
        return list.map((e) => (
            <td id="table_data_block" onClick={(event)=>{select(e.row, e.col); event.stopPropagation();}} 
            style={(e.row === target.row && e.col === target.col)? {border: "3px solid #0080FF"}: {border: "1px solid black"}}>
                <input ref={el => (inputRef.current[row * colNumber + e.col] = el)} /*disabled={(e.row === target.row && e.col === target.col)? "": "true"}*//>
            </td>));
    }

    function rowMaker() {
        var list = [];
        for (var i = 0; i < rowNumber; i++) list[i] = i + 1;
        return list.map((e, index) => (
            <tr>
                {(e === 1)?  
                <td id="table_gray_block" rowSpan={rowNumber.toString()} valign="top">
                    <button id="control_button" onClick={(event) => {deleteData(0); event.stopPropagation();}}>+</button>
                    <button id="control_button" onClick={(event) => {deleteData(1); event.stopPropagation();}}>-</button>
                </td>: <></>} 
                <th id="table_row_block" style={{backgroundColor: (index === target.row)? "#D0D0D0": "#FCFCFC"}}>{e}</th>
                {dataMaker(index)}
            </tr>
        ));
    }

	return (
        <>
            <table ref={tableRef} >
                <tr>
                    <td id="table_gray_block" rowSpan="2" /><td id="table_gray_block" /><td id="table_button_block" valign="top">
                        <button id="control_button" onClick={(event) => {deleteData(2); event.stopPropagation();}}>+</button>
                        <button id="control_button" onClick={(event) => {deleteData(3); event.stopPropagation();}}>-</button>
                    </td>{temp.map((e) => (<td id="table_gray_block" />))}
                </tr>
                <tr>
                    <th id="table_row_block" colSpan="1"/>
                    {colMaker()}
                </tr>
                {rowMaker()}
            </table>
        </>);
};
