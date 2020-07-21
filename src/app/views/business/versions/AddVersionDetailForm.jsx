import React from "react";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Icon,
  Button,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import RateSelector from "../rates/RateSelector";
const classes = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const OnRateSelectedHandler=(e)=>{
  console.log(e)
}
const AddRateForm = () => (
  
  
  <div>
    
    <h1>Add a Release</h1>
    <Formik
      initialValues={{ major: "", minor: "", env: "dev", patch:"",description: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.major) {
          errors.major = "Required";
        } else if (values.major > 100) {
          errors.major = "Invalid major: should not exceed 100";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form className={classes.root} onSubmit={handleSubmit}>
          <Grid container spacing={6}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <TextField
                type="text"
                name="major"
                label="Major"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.major}
              />
              {errors.major && touched.major && errors.major}
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <TextField
                type="text"
                name="minor"
                label="Minor"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.minor}
              />
              {errors.minor && touched.minor && errors.minor}
            </Grid>

            <Grid item lg={3} md={3} sm={12} xs={12}>
              <RadioGroup
                className="mb-16"
                value={values.env}
                name="env"
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="dev"
                  control={<Radio color="secondary" />}
                  label="DEV"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="uat"
                  control={<Radio color="secondary" />}
                  label="UAT"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="prod"
                  control={<Radio color="secondary" />}
                  label="PROD"
                  labelPlacement="end"
                />
              </RadioGroup>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <RateSelector onRateSelected={OnRateSelectedHandler} ></RateSelector>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            <Icon>add</Icon>
            <span className="pl-8 capitalize">Add</span>
          </Button>
        </form>
      )}
    </Formik>
  </div>
);

export default AddRateForm;
