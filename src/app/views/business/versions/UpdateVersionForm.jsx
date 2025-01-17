import React, { useState, useEffect, useMutation } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Select,
  LinearProgress,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import { GET_VERSION_BY_ID, ADD_VERSION, APPLICATIONS } from "./GqlQueriesAndMutations";
import { dateFnsLocalizer } from "react-big-calendar";
import AppSelect from '../selectors/AppSelect';



const UpdateVersionForm = ({versionId}) => {
  const [state, setState] = useState({
    major: 0,
    minor: 0,
    patch: 0,
    appId: "app-1",
    description: "desc",
    date: Date(),
  });


  //const [apps,setApps]=useState([])
  // const [addVersion] = useMutation(ADD_VERSION);

  // useEffect(() => {
  //   console.log(`UpdateForm: versionId: ${props.versionId}`);
  //   // custom rule will have name 'isPasswordMatch'
  //   ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
  //     if (value !== state.password) {
  //       return false;
  //     }
  //     return true;
  //   });
  //   return ValidatorForm.removeValidationRule("isPasswordMatch");
  // }, []);

  const handleSubmit = (event) => {
    console.log(
      `Update Version handleSubmit${JSON.stringify(event.target.values)}`
    );
    console.log(event);
    console.log(state);
    // addVersion({
    //   variables: {
    //     major: state.major,
    //     minor: state.minor,
    //     patch: state.patch,
    //     description: state.description,
    //     appId: state.appId,
    //   },
    // })
    //   .then(({ data }) => {
    //     console.log(`Recieved DATA After ADDVERSION${JSON.stringify(data)}`);
    //     console.log(
    //       `data ADDVERSION ${JSON.stringify(data.addVersion.appId)}`
    //     );
    //     //setAddedVersionLog(data.addVersion);
    //     if (
    //       data
    //       // &&
    //       // data.addVersion.application &&
    //       // data.addVersion.application.id //&&
    //       //selectedApps.includes(data.addVersion.appId)
    //     ) {
    //       console.log(
    //         `data ADDVERSION INSIDE ${data.addVersion.appId}`
    //       );
    //       //setIsRefresh(true);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(`error ADDVERSION ${error.message}`);
    //   });
  };

  const handleChange = (event) => {
    event.persist();
    console.log(`handleChange ${event.target.name}=${event.target.value}`);
    let newState = { ...state };
    newState[event.target.name] = event.target.value;
    setState(newState);
    // setState({ [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => {
    console.log(date);
    let newState = { ...state };
    newState["date"] = date;
    setState(newState);
  };

  // const [updateVersion] = useMutation(UPDATE_VERSION, {
  //  refetchQueries: ["versionsByApp"],
  // });
  const { loading, error, data } = useQuery(GET_VERSION_BY_ID, {
    variables: { id: versionId },
  });
  
const onAppSelectedHandler=(event)=>{
  let newState = { ...state };
  newState["appId"] = event.target.value;
  setState(newState);
console.log(`onAppSelectedHandler : ${event.target.value}`);
}


  useEffect(() => {
    if (!loading && data) {
      let newData = data.versionById;
      console.log(
        `UPDATE Version FORM :data ${JSON.stringify(data.versionById)}`
      );


      setState({  major: newData.major,
        minor: newData.minor,
        patch: newData.patch,
        appId: newData.application.id,
        description: newData.description,
        date: Date() });
    }
  }, [loading, data]);


  // useEffect(() => {
  //   console.log(`Apps ${apps}`)
  //   if (!loadingApps && dataApps) {
  //     console.log(`Apps ${apps}`)
  //     setApps(dataApps.applications);
  //   }
  // }, [dataApps]);

  if (loading) return <LinearProgress />;
  if (error) return <p>ERROR Update Version:{error.message}</p>;
  return (
    <>
    <p>{JSON.stringify(state)}</p>
    <div>
      <ValidatorForm
        //ref="form"
        onSubmit={handleSubmit}
        onError={(errors) => null}
      >
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              className="mb-16 w-100"
              label="Major (less than 999)"
              onChange={handleChange}
              type="number"
              name="major"
              value={state.major}
              validators={[
                "required",
                "minStringLength: 1",
                "maxStringLength: 3",
              ]}
              errormessages={["this field is required"]}
            />
            <TextValidator
              className="mb-32 w-100"
              label="Minor"
              onChange={handleChange}
              type="number"
              name="minor"
              value={state.minor}
              validators={[
                "required",
                "minStringLength:1",
                "maxStringLength: 3",
              ]}
              errormessages={["this field is required"]}
            />
            <TextValidator
              className="mb-32 w-100"
              label="Patch"
              onChange={handleChange}
              type="number"
              name="patch"
              value={state.patch}
              validators={[
                "required",
                "minStringLength:1",
                "maxStringLength: 3",
              ]}
              errormessages={["this field is required"]}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <AppSelect defaultValue={state.appId} onItemSelected={onAppSelectedHandler}/>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className="mb-16 w-100"
                margin="none"
                id="mui-pickers-date"
                label="Live date"
                inputVariant="standard"
                type="text"
                autoOk={true}
                value={state.date || ''}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>

            <TextValidator
              type="text"
              name="description"
              label="Description"
              multiline
              rowsMax={12}
              rows={5}
              onChange={handleChange}
              //onBlur={handleBlur}
              value={state.description}
              validators={[
                "required",
                "minStringLength:1",
                "maxStringLength: 255",
              ]}
              errormessages={["this field is required"]}
            />
          </Grid>
          {/* <Grid item lg={12} md={12} sm={12} xs={12}>
         
          </Grid> */}
        </Grid>
        <Button color="primary" variant="contained" type="submit">
          <Icon>save</Icon>
          <span className="pl-8 capitalize">Save</span>
        </Button>
      </ValidatorForm>
    </div>
    </>
  );

};

export default UpdateVersionForm;
