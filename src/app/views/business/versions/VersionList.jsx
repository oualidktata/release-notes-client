import React from "react";
import {Table,TableHead,TableBody,TableRow,TableCell,IconButton,Icon} from '@material-ui/core'

// import { Grid, GridColumn, GridSelectionChangeEvent, GridRowClickEvent } from '@progress/kendo-react-grid';

const VersionList = ({versions}) => {
 

  if (versions && versions.length===0) {
    return <p>No versions Yet!, please select one or more apps</p>
  } 
  return (
    <>
      <div className="w-100 overflow-auto">
        <Table style={{ whiteSpace: "pre" }}>
          <TableHead>
            <TableRow>
              <TableCell className="px-0">Major</TableCell>
              <TableCell className="px-0">Minor</TableCell>
              <TableCell className="px-0">Patch</TableCell>
              <TableCell className="px-0">Description</TableCell>
              <TableCell className="px-0">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {versions.map(({id, major, minor,patch,description }) => (
              <TableRow key={id}>
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
                  <IconButton>
                    <Icon color="error">close</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* {rates.map(({ currency, rate }) => {
          return <Rate currency={currency} rate={rate}></Rate>;
        })} */}
    </>
  );
};

export default VersionList;
