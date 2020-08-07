import React,{useState,useEffect} from 'react';
import { Select, FormControl, InputLabel, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { APPLICATIONS } from "../versions/GqlQueriesAndMutations";
import { useQuery } from "@apollo/client";


// const useStyles = makeStyles({
//   option: {
//     fontSize: 15,
//     '& > span': {
//       marginRight: 10,
//       fontSize: 18,
//     },
//   },
// });
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AppSelect = ({ defaultValue, onItemSelected }) => {
  const classes = useStyles();
const [apps,setApps]=useState()
const [value,setValue]=useState(defaultValue)
  const { loading, error, data } = useQuery(APPLICATIONS, {
    variables: { tenantId: 1 },
    //skip: !selectedTenant,
  });

  // useEffect(() => {
  //    if(!loading && data){
  //     setApps(data.applications);
  //    }
  //  }, [loading, data,defaultValue])

  if (loading) return <LinearProgress />;
  if (error) {
    return <p>Error APP Selector: {error.message}</p>;

  }
   return (
      <>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="application">Application</InputLabel>
        <Select
          native
          defaultValue={defaultValue || ''}
          onChange={onItemSelected}
          inputProps={{
            name: 'application',
            id: 'application',
          }}
        >
          <option key={0} aria-label="None" value="" />
        {data.applications.map(item => <option key={item.id} value={item.id}>{item.id}-{item.name}</option>
          )}
        </Select>
      </FormControl>
      </>
    );
}
export default AppSelect