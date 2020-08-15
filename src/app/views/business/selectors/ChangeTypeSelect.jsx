import React from 'react';
import { Select, MenuItem,FormControl, InputLabel, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CHANGE_TYPES } from "../versions/GqlQueriesAndMutations";
import { useQuery } from "@apollo/client";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  // option: {
  //       fontSize: 15,
  //       '& > span': {
  //         marginRight: 10,
  //         fontSize: 18,
  //       },
  //     },
}));

const ChangeTypeSelect = ({id,name,defaultValue, onItemSelected }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(CHANGE_TYPES, {
    variables: { tenantId: 1 },
    //skip: !selectedTenant,
  });

  // useEffect(() => {
  //    if(!loading && data){
  //     setApps(data.applications);
  //    }
  //  }, [loading, data,defaultValue])

  if (loading) return <LinearProgress />;
  if (error) return <p>Error Selector: {error.message}</p>;
   return (
      <>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="changeType">Change Type</InputLabel>
        <Select
          defaultValue={defaultValue || ''}
          onChange={onItemSelected}
          id={id}
          name={name}
        >
        <MenuItem key={0} aria-label="None" value="" />
        {data.changeTypes.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          )}
        </Select>
      </FormControl>
      </>
    );
}
export default ChangeTypeSelect