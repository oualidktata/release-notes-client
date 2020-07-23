import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Fab,
  Icon,
  LinearProgress
} from "@material-ui/core";
import { VERSIONS } from "./GqlQueriesAndMutations";
import { useQuery, NetworkStatus } from "@apollo/client";
import EditVersion from "./EditVersion";
// import { Grid, GridColumn, GridSelectionChangeEvent, GridRowClickEvent } from '@progress/kendo-react-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  title: {
    fontSize: 14,
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

const VersionList = ({ selectedApps, updateCounters }) => {
  const classes = useStyles();



  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  
  const [selectedVersion,setSelectedVersion]=useState()
  
  const { loading, error, data, networkStatus } = useQuery(VERSIONS, {
    variables: { appIds: selectedApps },
    skip: !selectedApps && selectedApps.length,
    notifyOnNetworkStatusChange: true,
    //pollInterval:1500
  });

  useEffect(() => {
    if (data) {
      console.log("USE EFFECT VERSION LIST");
      console.log(JSON.stringify(data.versionsByApp.length));
      console.log(selectedApps);
      updateCounters(data.versionsByApp.length);
    }
  }, [data]);

  if (error) return <p>Error: {error.message}</p>;
  if (!data && loading) return <LinearProgress color="secondary" />;
  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (data.versionsByApp && data.versionsByApp.length === 0) {
    return <p>No versions Yet!, please select one or more apps</p>;
  }
  if (data) {
    return (
      <>
        <div className="w-100 overflow-auto">
          <Table style={{ whiteSpace: "pre" }}className="product-table">
            <TableHead>
              <TableRow>
                <TableCell className="px-0">#</TableCell>
                <TableCell className="px-0">App</TableCell>
                <TableCell className="px-0">Major</TableCell>
                <TableCell className="px-0">Minor</TableCell>
                <TableCell className="px-0">Patch</TableCell>
                <TableCell className="px-0">Description</TableCell>
                <TableCell className="px-0" align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.versionsByApp.map(
                (
                  { id, major, minor, patch, description, application },
                  index
                ) => (
                  <TableRow key={id}>
                    <TableCell className="px-0 capitalize" align="left">
                      {index+1}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {application.name}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {major}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {minor}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {patch}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {description}
                    </TableCell>
                    <TableCell className="px-0">
                      <Fab
                        size="small"
                        color="secondary"
                        aria-label="Edit"
                        className={classes.button}
                        onClick={handleClickOpen}
                      >
                        <Icon>edit_icon</Icon>
                      </Fab>
                      <Fab
                        size="small"
                        aria-label="Delete"
                        className={classes.button}
                      >
                        <Icon>delete</Icon>
                      </Fab>

                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
        <EditVersion isOpen={open} onCloseHandler={handleClose} versionToEdit={selectedVersion} />
      </>
    );
  }
};

export default VersionList;
