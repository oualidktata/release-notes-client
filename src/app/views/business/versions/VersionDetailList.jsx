import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
} from "@material-ui/core";
import { VERSIONDETAILS_BY_VERSION_ID } from "./GqlQueriesAndMutations";
import { useQuery, NetworkStatus } from "@apollo/client";
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

const VersionDetailList = ({versionId}) => {
  const classes = useStyles();
  const { loading, error, data, networkStatus } = useQuery(VERSIONDETAILS_BY_VERSION_ID, {
    variables: { versionId: versionId },
    //skip: !versionId,
    notifyOnNetworkStatusChange: true,
    //pollInterval:1500
  });


  useEffect(() => {
    if (data) {
      console.log(JSON.stringify(data.versionDetailsByVersionId.length));
    }
  }, [data]);
  console.log(JSON.stringify(data));

  if (error) return <p>Error: {error.message}</p>;
  if (!data && loading) return <LinearProgress color="secondary" />;
  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (data.versionDetailsByVersionId && data.versionDetailsByVersionId.length === 0) {
  return <p>{versionId}No details Yet!, please select one or more apps</p>;
  }
  if (data) {
    return (
      <>
        <div className="w-100 overflow-auto">
          <Table style={{ whiteSpace: "pre" }} className="product-table">
            <TableHead>
              <TableRow>
                <TableCell className="px-0">#</TableCell>
                <TableCell className="px-0">Short Description</TableCell>
                <TableCell className="px-0">Long Description</TableCell>
                <TableCell className="px-0">Status</TableCell>
                <TableCell className="px-0">Change Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.versionDetailsByVersionId.map(
                (
                  { id, shortDescription, longDescription, status,changeType },
                  index
                ) => (
                  <TableRow key={id}>
                    <TableCell className="px-0 capitalize" align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {shortDescription}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {longDescription}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {status.code}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {changeType.name}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
};

export default VersionDetailList;
