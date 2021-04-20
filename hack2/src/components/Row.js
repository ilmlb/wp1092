import Grid from '../components/Grid'
export default function Row ({rid, val}) {
  // console.log("rid:", rid,"val", val);
    return (
        <tr>
          <Grid row_idx={rid} column_idx={0} value={val[0]}/>
          <Grid row_idx={rid} column_idx={1} value={val[1]}/>
          <Grid row_idx={rid} column_idx={2} value={val[2]}/>
          <Grid row_idx={rid} column_idx={3} value={val[3]}/>
        </tr>
    );
};