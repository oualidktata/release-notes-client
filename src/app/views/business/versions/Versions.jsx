import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import {
  Grid,
  LinearProgress
} from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/client";
import AddVersionForm from "./AddVersionForm";
import VersionList from "./VersionList";
import ApplicationSelector from "../selectors/ApplicationSelector";
import { ADD_VERSION, APPLICATIONS } from "./GqlQueriesAndMutations";
import ShowRawData from "./ShowRawData";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   // button: {
//   //   margin: theme.spacing(1),
//   // },
//   // paper: {
//   //   padding: theme.spacing(1),
//   //   textAlign: "center",
//   //   color: theme.palette.text.secondary,
//   // },
//   input: {
//     display: "none",
//   },
//   title: {
//     fontSize: 14,
//   },
// }));
const Versions = () => {
  //const classes = useStyles();
  const defaultApp = "app-3";
  const initialApps = ["app-1", "app-2"];
  const [selectedApps, setSelectedApps] = useState(initialApps);
  const [counters, setCounters] = useState({ versionsCount: 0, appsCount: 0 });
  const [selectedTenant, setSelectedTenant] = useState("1");
  const [AddedVersionLog, setAddedVersionLog] = useState("");
  //#region GRAPHQL QUERIES AND MUTATIONS
  const ApplicationQueryResponse = useQuery(APPLICATIONS, {
    variables: { tenantId: selectedTenant },
    //skip: !selectedTenant,
  });
  const [addVersion] = useMutation(ADD_VERSION, {
    refetchQueries: ["versionsByApp"],
  });
  //#endregion

  //#region EFFECTS
  useEffect(() => {
    console.log(`Use Effect ${JSON.stringify(selectedApps)}`);
  }, [selectedApps]);
  //#endregion
  const updateCounters = (count) => {
    let newCounters = { ...counters };
    newCounters.versionsCount = count;
    setCounters(newCounters);
  };
  const AddVersionHandler = (values) => {
    console.log(JSON.stringify(values));
    addVersion({
      variables: {
        major: values.major,
        minor: values.minor,
        patch: values.patch,
        description: values.description,
        appId: values.appId,
      },
    })
      .then(({ data }) => {
        console.log(`Recieved DATA After ADDVERSION${JSON.stringify(data)}`);
        console.log(
          `data ADDVERSION ${JSON.stringify(data.addVersion.appId)}`
        );
        setAddedVersionLog(data.addVersion);
        if (
          data &&
          data.addVersion.application &&
          data.addVersion.application.id &&
          selectedApps.includes(data.addVersion.appId)
        ) {
          console.log(
            `data ADDVERSION INSIDE ${data.addVersion.appId}`
          );
          //setIsRefresh(true);
        }
      })
      .catch((error) => {
        console.log(`error ADDVERSION ${error.message}`);
      });
  };

  const onAppSelectedHandler = (event, value) => {
    //console.log(`onAppSelectedHandler:Event: ${JSON.stringify(event)}`);
    console.log(`onAppSelectedHandler:Value: ${JSON.stringify(value)}`);
    console.log(
      `onAppSelectedHandler:SlectedApps: ${JSON.stringify(selectedApps)}`
    );
    //let apps=
    setSelectedApps(value.map((x) => x.id));
  };

  console.log(`${selectedTenant}-${selectedApps}`);
  // if(selectedApps) return <p> {selectedApps}</p>;

  if (ApplicationQueryResponse.loading) return <LinearProgress />;
  if (ApplicationQueryResponse.error)
    return <p>Error APP Selector: {ApplicationQueryResponse.error.message}</p>;

  const initialValues = {
    major: "22",
    minor: "0",
    patch: "0",
    env: "dev",
    description: `${defaultApp}-From Web UI`,
    appId: defaultApp, //ApplicationQueryResponse.data.applicationsByTenant.filter(x=>x.id==='app-1')[0].id,
    apps: ApplicationQueryResponse.data.applicationsByTenant,
  };
  return (
    <>
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Versions", path: "/versions" },
              { name: "Versions" },
            ]}
          />
        </div>
      </div>

      <div className="m-sm-30">
        <Grid container direction="row" spacing={4}>
          <Grid
            item
            
            lg={8}
            md={8}
            sm={12}
            xs={12}
          >
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <ApplicationSelector
                items={ApplicationQueryResponse.data.applications}
                defaultValues={
                  selectedApps
                    ? ApplicationQueryResponse.data.applications.filter(
                        (x) => selectedApps.includes(x.id)
                      )
                    : ApplicationQueryResponse.data.applications.filter(
                        (x) => x.id === defaultApp
                      )
                }
                onItemSelected={onAppSelectedHandler}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {selectedApps && (
                <VersionList
                  selectedApps={selectedApps}
                  updateCounters={updateCounters}
                ></VersionList>
              )}
            </Grid>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h2>Count: {counters.versionsCount}</h2>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <AddVersionForm
                initial={initialValues}
                onSubmitHandler={AddVersionHandler}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
            <ShowRawData
              content={AddedVersionLog}
              title="Dev debug..."
            />
          </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Versions;
