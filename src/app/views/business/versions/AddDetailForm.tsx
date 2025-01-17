import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  LinearProgress,
  Grid,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { ADD_VERSION_DETAIL } from "./GqlQueriesAndMutations";
import { useMutation } from "@apollo/client";

import StatusSelect from "../selectors/StatusSelect";
import ChangeTypeSelect from "../selectors/ChangeTypeSelect";
import LinkList from "./LinkList";

import AddLinkForm from "./AddLinkForm";
import { onError } from "@apollo/client/link/error";

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
  },
}));

type LinkInput = {
  id?: String;
  versionDetailId?: String;
  name: String;
  link: String;
  targetSystemId: String;
  isActive?: Boolean;
};
type LinkInputViewModel = {
  name: String;
  link: String;
  targetSystemId: String;
  targetSystemName: String;
  isActive?: Boolean;
};
interface VersionDetailInput {
  versionId: string;
  shortDescription: string;
  longDescription: String;
  statusId: String;
  changeTypeId: String;
  isActive: Boolean;
  linksInput: [LinkInput];
}

const AddDetailForm = ({ versionId }) => {
  const classes = useStyles();

  const initialLinkFormValues = {
    // id: "",
    // versionDetailId: "v1-0001",
    link: "",
    name: "",
    isActive: true,
    targetSystemId: "1",
    targetSystemName:""
  };
  const [addVersionDetail] = useMutation(ADD_VERSION_DETAIL, {
    refetchQueries: ["versionDetailsByVersionId"],
  });
  const emptyLinks:LinkInputViewModel[]=[]
  const [links, setLinks] = useState(emptyLinks);

  const onLinkAddedHandler = (values) => {  
    setLinks([...links,{
      name: values.name,
      link: values.link,
      isActive:values.isActive,
      targetSystemId: values.targetSystemId,
      targetSystemName: values.targetSystemName,
    }]);
  };
  // const link = onError(({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors)
  //     graphQLErrors.map(({ message, locations, path }) =>
  //       console.log(
  //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //       )
  //     );

  //   if (networkError) console.log(`[Network error]: ${networkError}`);
  // });
  return (
    <>
      <Grid
        container
        className={classes.root}
        spacing={2}
        justify="space-evenly"
        direction="row"
      >
         <Grid container item lg={6} md={6} sm={12} xs={12} direction="row">
        <Formik
          initialValues={{
            versionId: versionId,
            shortDescription: "",
            longDescription: "",
            statusId: "1",
            changeTypeId: "1",
            isActive: true,
            linksInput:emptyLinks,
          }}
          validate={(values) => {
            const errors: Partial<VersionDetailInput> = {};
            if (!values.shortDescription) {
              errors.shortDescription = "Required";
            }
            if (!values.longDescription) {
              errors.longDescription = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            values.linksInput = links.map(x=>{
              delete x["targetSystemName"]
            return x;
            });
            addVersionDetail({ variables: { input: values } });
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
          }) => (
            <Form>
                  <Grid
                  item
                  container
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  direction="row"
                >
                <FormControl fullWidth className={classes.margin}>
                  <Field
                    component={TextField}
                    name="shortDescription"
                    type="shortDescription"
                    label="Short Description"
                    value={values.shortDescription}
                    max-width="lg"
                    full-width="true"
                  />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                  <Field
                    component={TextField}
                    type="longDescription"
                    label="Long Description"
                    name="longDescription"
                    value={values.longDescription}
                    multiline
                  />
                </FormControl>
              
                  <Grid container item lg={6} md={6} sm={12} xs={12} direction="row">
                    <FormControl fullWidth className={classes.margin}>
                      <Field
                        id="statusId"
                        name="statusId"
                        value={values.statusId}
                        render={({ field, form }) => (
                          <StatusSelect
                            {...field}
                            defaultValue={"1"}
                            onItemSelected={(e) => {
                              handleChange(e);
                              form.setFieldValue("statusId", e.target.value);
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid container item lg={6} md={6} sm={12} xs={12} direction="row">
                    <FormControl fullWidth className={classes.margin}>
                      <Field
                        id="changeTypeId"
                        name="changeTypeId"
                        value={values.changeTypeId}
                        render={({ field, form }) => (
                          <ChangeTypeSelect
                            {...field}
                            defaultValue={"1"}
                            onItemSelected={(e) => {
                              handleChange(e);
                              form.setFieldValue(
                                "changeTypeId",
                                e.target.value
                              );
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              {isSubmitting && <LinearProgress />}
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        </Grid>

        <Grid container item lg={6} md={6} sm={12} xs={12} direction="row">
          <AddLinkForm
            initial={initialLinkFormValues}
            onSubmitHandler={onLinkAddedHandler}
          />
          <LinkList links={links} />
        </Grid>
      </Grid>
    </>
  );
};
export default AddDetailForm;
