import React, { useState } from "react";
export default ({rid, cell_idx, cursor}) => {
    const [content, setContent] = useState("");
    const [index, setIndex] = useState(cell_idx);
    const [row, setRow] = useState(rid);

    return <input type="text" 
                  value={content}
                  onClick={(e) => {e.target.select();}} 
                  onChange={(e) => setContent(e.target.value.trim())}
                  onBlur={() => cursor(-1,- 1)}
                  onFocus={() => cursor(row, index)}/>;
}