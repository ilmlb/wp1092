import React, { useState }  from "react";
export default ({action}) => {
    const [header, setHeader] = useState(26);

    return <div class="header_box">{intToHeader(header)}</div>
}

function intToHeader(n) {
    let h = [];
    for (let i = 0; i < n; ++i) {
        h.push(<div>{intToChar(i)}</div>);
    }
    return h;
}

function intToChar(n) {
    if (n > 25) {
        return intToChar(Math.trunc(n / 26) - 1) + String.fromCharCode(n % 26 + 65);
    } else {
        return String.fromCharCode(n + 65);
    }
}
