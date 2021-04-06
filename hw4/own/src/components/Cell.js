import React, { useState } from "react";
export default ({text}) => {
    const [content, setContent] = useState("");
    // const [position, setPosition] = useState([0, 0]);

    return <input type="text" value={content} onChange={() => setContent("")}></input>;
}