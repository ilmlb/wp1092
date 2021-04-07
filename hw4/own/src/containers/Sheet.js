import React, { useState } from "react";
import Row from "../components/Row";

export default ({action, pos}) => {
    let s = [];
    for (let i = 0; i < 100; ++i) {
        s.push(<Row row_idx={i} focus={pos}/>);
    }
    const [grid, setGrid] = useState(s); // save Rows in grid

    return <div class="sheet">{grid}</div>;
}