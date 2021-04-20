export default function Grid ({row_idx, column_idx, value}) {
    // console.log(row_idx, column_idx)
    
    let grid_id = `grid-${row_idx}-${column_idx}`;
    // let value_id = `value-0-0`;
    let temp_class_name = `grid level-${value}`;
    let value_id = `value-${row_idx}-${column_idx}`;
    const mapping = {'':"", 2:"NCTU", 4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"}

    // #########################
    // # 1 #2 Modify everything here (including the above one) yourself
    // #########################

    return (
        <td>
            <div className={temp_class_name} id={grid_id}>
                <div className="school-name" id={value_id}>{mapping[value]}</div>
            </div>
        </td>
    );
}