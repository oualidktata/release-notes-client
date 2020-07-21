import React from 'react';
import {useQuery,gql} from '@apollo/client';
import Select from '@material-ui/core/Select'
import { MenuItem } from '@material-ui/core';
const RateSelector=({onRateSelected})=> {

const RATES=gql`
{
    rates(currency:"CAD"){
      currency 
      rate
    }
  }
`

const {loading,error,data}=useQuery(RATES);

if (loading) return <p>Loading...</p>;
if (error) return<p>Error: {error.message}</p>;
return (
  <Select name="rate" onChange={onRateSelected}>
      {data.rates.map(({currency,rate})=> (
        <MenuItem key={currency} value={currency+rate}>
          {currency}
        </MenuItem>
      ))}
    </Select>
);
}
export default RateSelector