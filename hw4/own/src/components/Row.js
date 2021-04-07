import React, { useState } from "react";
import Cell from "../components/Cell";

export default ({row_idx, focus}) => {
    let r = [];
    for (let i = 0; i < 26; ++i) {
        r.push(<Cell rid={row_idx} cell_idx={i} cursor={focus}/>);
    }
    const [idx, setIdx] = useState(0);
    const [row, setRow] = useState(r); // save Cells in grid
    
    return <div class="row">{row}</div>;
}