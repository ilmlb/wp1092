import React, { useState } from "react";
import Cell from "../components/Cell";

export default ({action}) => {
    let r = [];
    for (let i = 0; i < 26; ++i) {
        r.push(<Cell/>);
    }
    const [idx, setIdx] = useState(0);
    const [row, setRow] = useState(r); // save Cells in grid
    
    return <div class="row">{row}</div>;
}