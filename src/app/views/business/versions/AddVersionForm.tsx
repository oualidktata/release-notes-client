import React from "react";
import { Formik,Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Icon,
  Button,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    flexGrow:1,
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  },
}));

type AddVersionFormModel={
  major:String;
  minor:String;
  patch:String;
  description:String;
  env:string;

}
const AddVersionForm = ({initial,onSubmitHandler}) => {
const classes=useStyles();
  return (
   <>
    <Formik
      initialValues={initial}
      validate={(values:AddVersionFormModel) => {
        const errors:Partial<AddVersionFormModel> = {};
        if (!values.major) {
          errors.major = "Required";
        } else if (+values.major> 100) {
          errors.major = "Invalid major: should not exceed 100";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmitHandler(values)
        setSubmitting(false);
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
        <Form className={classes.root}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  type="text"
                  name="major"
                  label="Major"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.major}
                />
                {errors.major && touched.major && errors.major}
                <TextField
                  type="text"
                  name="minor"
                  label="Minor"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.minor}
                />
                {errors.minor && touched.minor && errors.minor}
                <TextField
                  type="text"
                  name="patch"
                  label="Patch"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.patch}
                />
                {errors.patch && touched.patch && errors.patch}
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
                  type="text"
                  name="description"
                  label="Description"
                  multiline
                  rowsMax={12}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {errors.description && touched.description && errors.description}

            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
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
          </Grid>
          <Button
            variant="outlined"
            size="small"
            type="submit"
            disabled={isSubmitting}
          >
            <Icon>save</Icon>
            <span className="pl-8 capitalize">Save</span>
          </Button>
        </Form>
      )}
    </Formik>
  </>
);
}

export default AddVersionForm;
