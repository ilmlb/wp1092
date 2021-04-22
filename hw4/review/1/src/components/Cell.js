import React, {useState} from "react";

function Cell(props){
    const [mod, setMod] = useState("button");

    const onKeyPress = (event) => {
        if(event.key === 'Enter' && mod === "text"){
            // console.log("cell", props.indices);
            props.Focus([props.indices[0]+1, props.indices[1]]);
        }

        if(mod === "button")
        {
            setMod("text");
            document.getElementById(`${props.indices[0]}-${props.indices[1]}`).value = "";
        }
    };

    const onKeyDown = (event) => {
        if(event.keyCode === 8 ||event.keyCode === 46)
        {
            setMod("text");
            document.getElementById(`${props.indices[0]}-${props.indices[1]}`).value = "";
        }
        switch(event.keyCode)
        {
            case 8:
                setMod("text");
                document.getElementById(`${props.indices[0]}-${props.indices[1]}`).value = "";
                break;
            case 46:
                setMod("text");
                document.getElementById(`${props.indices[0]}-${props.indices[1]}`).value = "";
                break;
            case 37:
                props.Focus([props.indices[0], props.indices[1]-1]);
                break;
            case 38:
                props.Focus([props.indices[0]-1, props.indices[1]]);
                break;
            case 39:
                props.Focus([props.indices[0], props.indices[1]+1]);
                break;
            case 40:
                props.Focus([props.indices[0]+1, props.indices[1]]);
                break;
            default:
            break;
        }
    }

    const OnClick = (event) => {
        if(event.clientX !== 0)
            props.Focus(props.indices);
    };

    const OnDblclick = () => {
        setMod("text");
    }    

    const OnBlur = (event) => {
        setMod("button");
        if(event.relatedTarget === null)
        {
            props.Focus(null);
        }
    };

    return(
        <td className="block">
            <input type={mod} className="input_block" id={`${props.indices[0]}-${props.indices[1]}`} onClick={OnClick} onDoubleClick={OnDblclick} onKeyPress={onKeyPress} onKeyDown={onKeyDown} onBlur={OnBlur}></input>
        </td>
    );
}

export default Cell;