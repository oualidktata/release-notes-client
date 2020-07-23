import React from 'react'
import AddDetailForm from './AddDetailForm'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField
  } from "@material-ui/core";
const EditDetailsDialog=({isOpen,onCloseHandler,versionToEdit}) =>{
    console.log(`OPEN ${JSON.stringify(isOpen)}`)
    const initialValues = {
      major: "0",
      minor: "0",
      patch: "0",
      env: "dev",
      description: "description",
      appId: "app-3", //ApplicationQueryResponse.data.applicationsByTenant.filter(x=>x.id==='app-1')[0].id,
      apps: ["app-1","app-2","app-3"],
    };
    return (
        <Dialog
        open={isOpen}
        onClose={onCloseHandler}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add details for version:<h2>{initialValues.major}.{initialValues.minor}.{initialValues.patch}</h2>
          </DialogContentText>
         <AddDetailForm/>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler} color="primary">
            Cancel
          </Button>
          <Button onClick={onCloseHandler} color="primary">
            save
          </Button>
        </DialogActions>
      </Dialog>
    )
}
export default EditDetailsDialog