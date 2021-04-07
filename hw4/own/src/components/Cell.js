import React, { useState } from "react";
export default ({cell_idx}) => {
    const [content, setContent] = useState("");
    const [index, setIndex] = useState(cell_idx);

    return <input type="text" value={content} onClick={(e) => e.target.select()} onChange={(e) => setContent(e.target.value.trim())}></input>;
}