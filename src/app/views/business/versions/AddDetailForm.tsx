import React, { useState } from "react";
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
import LinkList2 from "./LinkList2";

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
interface VersionDetailInput {
  versionId: string;
  shortDescription: string;
  longDescription: String;
  statusId: String;
  changeTypeId: String;
  isActive: Boolean;
}

const AddDetailForm = ({ versionId }) => {
  const classes = useStyles();

  const initialLinkFormValues = {
    id: "1",
    versionDetailId: "v1-0001",
    link: "link here...",
    name: "link display name",
    isActive:"true",
    targetSystemId: "1",
  };
  const [addVersionDetail] = useMutation(ADD_VERSION_DETAIL, {
    refetchQueries: ["versionDetailsByVersionId"],
  });
  const onLinkAddedHandler = (e) => {
    console.log(e.target.value);
  };
  const link = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const [links, setLinks] = useState([
    {
      id: "1",
      versionDetailId: "v1-0001",
      link: "  http://www.google.com",
      name: "sample name",
      targetSystem: {
        id: "1",
        name: "TFS",
      },
    },
    {
      id: "2",
      versionDetailId: "v1-0001",
      link: "http://www.facebook.com",
      name: "45889",
      targetSystem: {
        id: "2",
        name: "Service desk",
      },
    },
    {
      id: "3",
      versionDetailId: "v1-0002",
      link: "http://www.amazon.com",
      name: "SD-520",
      targetSystem: {
        id: "1",
        name: "TFS",
      },
    },
  ]);
  const [state, setState] = useState({
    versionId: versionId,
    shortDescription: "tttt",
    longDescription: "ttttttttttt",
    statusId: "1",
    changeTypeId: "1",
    isActive: true,
    LinksInput: [],
  });
  return (
    <>
      <p>{JSON.stringify(state)}</p>
      <Formik
        initialValues={{
          versionId: versionId,
          shortDescription: "",
          longDescription: "",
          statusId: "1",
          changeTypeId: "1",
          isActive: true,
          LinksInput: [],
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
          console.log(`Values AddDetailForm: ${values}`);
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
              container
              className={classes.root}
              spacing={2}
              justify="space-evenly"
              direction="row"
            >
              <Grid item lg={6} md={6} sm={12} xs={12} direction="column">
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
                <Grid
                  item
                  container
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  direction="row"
                >
                  <Grid item lg={6} md={6} sm={12} xs={12} direction="row">
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
                  <Grid item lg={6} md={6} sm={12} xs={12} direction="row">
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
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} direction="row">
                <AddLinkForm
                  initial={initialLinkFormValues}
                  onSubmitHandler={onLinkAddedHandler}
                />
                <LinkList links={links} />
                <LinkList2></LinkList2>
              </Grid>
            </Grid>

            {isSubmitting && <LinearProgress />}

            <br />
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
    </>
  );
};
export default AddDetailForm;
