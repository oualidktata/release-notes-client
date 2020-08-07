import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import { VERSIONS } from "./GqlQueriesAndMutations";
import { useQuery, NetworkStatus } from "@apollo/client";
import EditDetailsDialog from "./EditDetailsDialog";
import EditVersionDialog from "./EditVersionDialog";
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

  const [openEditVersionDialog, setOpenEditVersionDialog] = useState(false);
  const [openEditDetailsDialog, setOpenEditDetailsDialog] = useState(false);

  const handleOpenEditVersionDialog = (id) => {
    setSelectedVersion(id);
    setOpenEditVersionDialog(true);
  };
  const handleOpenEditDetailsDialog = (id) => {
    setSelectedVersion(id);
    setOpenEditDetailsDialog(true);
  };

  const handleCloseEditVersionDialog = () => {
    setOpenEditVersionDialog(false);
  };

  const handleCloseEditDetailsDialog = () => {
    setOpenEditDetailsDialog(false);
  };
  const handleUpdateVersionHandler = (event) => {
    console.log(`Version LIST: handleUpdateVersionHandler${event}`);
  };

  const [selectedVersion, setSelectedVersion] = useState();

  const { loading, error, data, networkStatus } = useQuery(VERSIONS, {
    variables: { appIds: selectedApps },
    skip: !selectedApps && selectedApps.length,
    notifyOnNetworkStatusChange: true,
    //pollInterval:1500
  });

  useEffect(() => {
    if (data) {
      updateCounters(data.versionsByApp.length);
    }
  }, [data]);//no updateCounters, this will render infinite loop

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
          <Table style={{ whiteSpace: "pre" }} className="product-table">
            <TableHead>
              <TableRow>
                <TableCell className="px-0">#</TableCell>
                <TableCell className="px-0">App</TableCell>
                <TableCell className="px-0">Major</TableCell>
                <TableCell className="px-0">Minor</TableCell>
                <TableCell className="px-0">Patch</TableCell>
                <TableCell className="px-0">Description</TableCell>
                <TableCell className="px-0" align="center">
                  Actions
                </TableCell>
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
                      {index + 1}
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
                    <TableCell className="px-0 flex flex-middle condensed">
                        <IconButton
                          size="small"
                          aria-label="list"
                          className={classes.button}
                          color="primary"
                          onClick={() => handleOpenEditVersionDialog(id)}
                        >
                          <Icon>edit</Icon>
                        </IconButton>

                        <IconButton
                          size="small"
                          className={classes.button}
                          aria-label="list"
                          color="primary"
                          onClick={()=>handleOpenEditDetailsDialog(id)}
                        >
                          <Icon>list</Icon>
                        </IconButton>
                        <IconButton
                          size="small"
                          className={classes.button}
                          aria-label="Delete"
                          color="primary"
                          //onClick={handleOpenEditDetailsDialog}
                        >
                          <Icon>delete</Icon>
                        </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
        <EditVersionDialog
          isOpen={openEditVersionDialog}
          onCloseHandler={handleCloseEditVersionDialog}
          versionId={selectedVersion}
          onUpdateHandler={handleUpdateVersionHandler}
        />
        <EditDetailsDialog
          isOpen={openEditDetailsDialog}
          onCloseHandler={handleCloseEditDetailsDialog}
           versionId={selectedVersion}
        />
      </>
    );
  }
};

export default VersionList;
