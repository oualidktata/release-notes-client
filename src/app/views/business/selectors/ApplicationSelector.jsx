import React, {useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const ApplicationSelector=({items,defaultValues,onItemSelected})=> {
  const classes = useStyles();
  // const [selectedItems,setSelectedItems]=useState([items[0],items[1]]);
 //console.log(`items:${JSON.stringify(items)}`)
return (
  // <Select name="rate" onChange={onItemSelected}>
  //     {items.map(({itemId,code,name})=> (
  //        <MenuItem key={itemId} value={itemId}>
  //        {`${code}-${name}`}
  //       </MenuItem>
  //     ))}
  //   </Select>
<Autocomplete
  multiple
  options={items}
  getOptionLabel={(option) => option.name}
  defaultValue={defaultValues}
  filterSelectedOptions
  onChange={onItemSelected}
  renderInput={(params) => (
    <TextField
      {...params}
      variant="standard"
      label="Choose one or multiple apps"
      placeholder="Applications"
      margin="normal"
    />
  )}
/>

);
}
export default ApplicationSelector