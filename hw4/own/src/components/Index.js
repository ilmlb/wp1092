import React, { useState }  from "react";
export default ({action, dark}) => {
    const [index, setIndex] = useState(100);

    return <div class="index_box">{intToIndex(index, dark)}</div>
}

function intToIndex(n) {
    let idx = [];
    for (let i = 0; i < n; ++i) {
        idx.push(<div>{i + 1}</div>);
    }
    return idx;
}