import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Icon,
  Button,
  Tooltip,
  Fade,
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
type LinkProps = {
  links: any;
};
const onDeleteLinkHandler = (id) => {
  console.log(id);
};
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
const LinkList: FunctionComponent<LinkProps> = ({ links }) => {
  const classes = useStyles();
  if (!links) return <p>No Links...</p>;
  return (
    <>
      {/* <p>LINKS Inside linkList:{JSON.stringify(links)}</p> */}
      <div className="w-100 overflow-auto">
        <Table style={{ whiteSpace: "pre" }} className="product-table">
          <TableHead>
            <TableRow>
              <TableCell className="px-0">#</TableCell>
              <TableCell className="px-0">Name</TableCell>
              <TableCell className="px-0">Target System</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links.map(({ id, name, link, targetSystemName }, index) => (
              <TableRow key={id}>
                <TableCell className="px-0 capitalize" align="left">
                  {index + 1}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title={link}
                  >
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<LinkIcon />}
                    >
                      {name}
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {targetSystemName}
                </TableCell>
                <TableCell className="px-0">
                  <IconButton onClick={() => onDeleteLinkHandler(id)}>
                    <Icon color="error">close</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default LinkList;
