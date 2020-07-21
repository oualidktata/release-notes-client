import React from 'react';
import Select from '@material-ui/core/Select'
import { MenuItem } from '@material-ui/core';
const ExternalSystemSelector=({items,onSystemSelected})=> {
return (
  <Select name="rate" onChange={onSystemSelected}>
      {items.map(({sysId,sysCode,sysName})=> (
         <MenuItem key={sysId} value={sysId}>
         {`${sysCode}-${sysName}`}
        </MenuItem>
      ))}
    </Select>
);
}
export default ExternalSystemSelector