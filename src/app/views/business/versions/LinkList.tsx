import React,{FunctionComponent} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Icon
} from "@material-ui/core";
// import { Grid, GridColumn, GridSelectionChangeEvent, GridRowClickEvent } from '@progress/kendo-react-grid';

type LinkProps={
  links:any
}
const onDeleteLinkHandler=(id)=>{
console.log(id)
}
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
const LinkList:FunctionComponent<LinkProps> = ({links}) => {
  //const classes = useStyles();
  if(!links) return <p>No Links...</p>
  return (
      <>
        <div className="w-100 overflow-auto">
          <Table style={{ whiteSpace: "pre" }} className="product-table">
            <TableHead>
              <TableRow>
                <TableCell className="px-0">#</TableCell>
                <TableCell className="px-0">Name</TableCell>
                <TableCell className="px-0">Link</TableCell>
                <TableCell className="px-0">Target System</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {links.map(
                (
                  { id, name,link, targetSystem},
                  index
                ) => (
                  <TableRow key={id}>
                    <TableCell className="px-0 capitalize" align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {name}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {link}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {targetSystem.name}
                    </TableCell>
                    <TableCell className="px-0">
                <IconButton onClick={()=>onDeleteLinkHandler(id)}>
                  <Icon color="error">close</Icon>
                </IconButton>
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

export default LinkList;
