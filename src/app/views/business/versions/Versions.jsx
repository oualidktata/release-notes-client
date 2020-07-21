import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import {
  Grid,
  Paper,
  Button,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  makeStyles,
} from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/client";
import AddVersionForm from "./AddVersionForm";
import VersionList from "./VersionList";
import ApplicationSelector from "../selectors/ApplicationSelector";
import { ADD_VERSION, VERSIONS, APPLICATIONS } from "./GqlQueriesAndMutations";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));
const Versions = () => {
  const classes = useStyles();
  const defaultApp = "app-1";
  const initialApps = [{ id: "app-1", name: "AGATE" }];
  const [selectedApps, setSelectedApps] = useState([]);
  const [counters, setCounters] = useState({ versionsCount: 0, appsCount: 0 });
  const [selectedTenant, setSelectedTenant] = useState("Dev");
const [isVersionUpserted,setVersionUpserted]=useState(false);
  //#region GRAPHQL QUERIES AND MUTATIONS
  const { loading, error, data, refetch: refetchVersions } = useQuery(
    VERSIONS,
    {
      variables: { appIds: selectedApps },
      skip: !selectedApps && selectedApps.length,
    }
  );

  const ApplicationQueryResponse = useQuery(APPLICATIONS, {
    variables: { tenantId: selectedTenant },
    //skip: !selectedTenant,
  });

  const [addVersion] = useMutation(ADD_VERSION);
  //#endregion

  //#region EFFECTS
  useEffect(() => {
    console.log(`Use Effect ${JSON.stringify(selectedApps)}`);
    console.log(`Use Effect ${JSON.stringify(data)}`);
    // if(data){
    //   setVersions(data.versionsByApp);
    var updatedCounters = { ...counters };
    updatedCounters.appsCount = selectedApps.length;
    setCounters(updatedCounters);
    refetchVersions();
    // }
  }, [selectedApps,isVersionUpserted, data, refetchVersions]);
  //#endregion

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
    }).then(({data})=>{
console.log(`Recieved DATA After ADDVERSION${JSON.stringify(data)}`)
console.log(`data ADDVERSION ${JSON.stringify(data.addVersion.application.id)}`);
if (data && data.addVersion.application && data.addVersion.application.id && selectedApps.includes(data.addVersion.application.id)){
  console.log(`data ADDVERSION INSIDE ${data.addVersion.application.id}`);

  refetchVersions()
}
    
    })
    .catch(error=>{
      console.log(`error ADDVERSION ${error.message}`);
    });
  };

  const onAppSelectedHandler = (event, value) => {
    console.log(`onAppSelectedHandler:Value: ${JSON.stringify(value)}`);
    setSelectedApps(value.map((x) => x.id));
  };
  console.log(`${selectedTenant}-${selectedApps}`);
  // if(selectedApps) return <p> {selectedApps}</p>;
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;
  if (ApplicationQueryResponse.loading) return <p>Loading App Selector...</p>;
  if (ApplicationQueryResponse.error)
    return <p>Error APP Selector: {ApplicationQueryResponse.error.message}</p>;
  // if (selectedApps) return <p>data: {JSON.stringify(data)}</p>
  const initialValues = {
    major: "0",
    minor: "0",
    patch: "0",
    env: "dev",
    description: "description",
    appId: "app-1", //ApplicationQueryResponse.data.applicationsByTenant.filter(x=>x.id==='app-1')[0].id,
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
        <AddVersionForm
          initial={initialValues}
          onSubmitHandler={AddVersionHandler}
        ></AddVersionForm>

          <div>{isVersionUpserted && (<p>{isVersionUpserted}</p>)}</div>
        <div></div>
        <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
          <ApplicationSelector
            items={ApplicationQueryResponse.data.applicationsByTenant}
            defaultValues={
              selectedApps
                ? ApplicationQueryResponse.data.applicationsByTenant.filter(
                    (x) => selectedApps.includes(x.id)
                  )
                : ApplicationQueryResponse.data.applicationsByTenant.filter(
                    (x) => x.id === defaultApp
                  )
            }
            onItemSelected={onAppSelectedHandler}
          />
          </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        {selectedApps && (
            <VersionList versions={data.versionsByApp}></VersionList>
          )}
        </Grid>
        
        </Grid>
      </div>
    </>
  );
};

export default Versions;
