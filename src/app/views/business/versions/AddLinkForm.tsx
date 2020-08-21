import React from "react";
import { Formik, Field, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Icon, Button, FormControl,FormControlLabel,Checkbox } from "@material-ui/core";
import TargetSystemSelect from "../selectors/TargetSystemSelect";

import { TextField } from "formik-material-ui";

type AddLinkViewModel = {
  id: string;
  versionDetailId: string;
  link: string;
  name: string;
  isActive:boolean;
  targetSystemId: string;
  targetSystemName: string;
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
        validate={(values: AddLinkViewModel) => {
          const errors: Partial<AddLinkViewModel> = {};
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
          <Form className={classes.root}>
            <Grid container spacing={2} justify="space-between" direction="row">
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <FormControl fullWidth className={classes.margin}>
                  <Field
                    component={TextField}
                    name="name"
                    type="text"
                    label="Name"
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
                         form.setFieldValue("targetSystemId", e.target.value);
                          form.setFieldValue("targetSystemName", e.target.value);
                          handleChange(e);
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
            value={values.isActive}
            //checked={values.isActive}
            name="isActive"
            color="primary"
          />
        }
        label="Active"
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddLinkForm;
