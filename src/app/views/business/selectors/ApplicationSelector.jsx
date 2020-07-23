import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete'
import {TextField} from '@material-ui/core';
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
return (
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