import React from "react";
import { Formik, Field, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Icon, Button, TextField, FormControl,FormControlLabel,Checkbox } from "@material-ui/core";
import TargetSystemSelect from "../selectors/TargetSystemSelect";

type AddLinkInput = {
  id: string;
  versionDetailId: string;
  link: string;
  name: string;
  isActive:boolean;
  targetSystemId: string;
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  }, // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // },
}));

const AddLinkForm = ({ initial, onSubmitHandler }) => {
  const classes = useStyles();

  return (
    <>
      <Formik
        initialValues={initial}
        validate={(values: AddLinkInput) => {
          const errors: Partial<AddLinkInput> = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.link) {
            errors.link = "Required";
          }
          if (!values.targetSystemId) {
            errors.targetSystemId = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          onSubmitHandler(values);
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
          <form className={classes.root} onSubmit={handleSubmit}>
            <Grid container spacing={2} justify="space-between" direction="row">
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <FormControl fullWidth className={classes.margin}>
                  <Field
                    component={TextField}
                    name="name"
                    type="text"
                    label="Name"
                    value={values.name}
                    max-width="lg"
                    full-width="true"
                  />
                </FormControl>
              </Grid>
              <Grid item lg={10} md={10} sm={12} xs={12}>
                <FormControl fullWidth className={classes.margin}>
                  <Field
                    component={TextField}
                    name="link"
                    type="text"
                    label="Link"
                    value={values.link}
                    max-width="lg"
                    full-width="true"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} justify="space-between" direction="row">
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth className={classes.margin}>
                  <Field
                    id="targetSystemId"
                    name="targetSystemId"
                    value={values.targetSystemId}
                    render={({ field, form }) => (
                      <TargetSystemSelect
                        {...field}
                        defaultValue={"1"}
                        onItemSelected={(e) => {
                          handleChange(e);
                          form.setFieldValue("targetSystemId", e.target.value);
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControlLabel
        control={
          <Checkbox
            checked={values.isActive}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Primary"
      />
              </Grid>
              <Grid container item lg={2} md={2} sm={12} xs={12} justify="flex-end" alignItems="center">
                <Button
                  variant="outlined"
                  size="small"
                  type="submit"
                  color="secondary"
                  disabled={isSubmitting}
                >
                  <Icon>add</Icon>
                  <span className="pl-8 capitalize">link</span>
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddLinkForm;
