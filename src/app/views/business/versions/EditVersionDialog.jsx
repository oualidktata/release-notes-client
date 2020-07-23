import React from 'react'
import AddVersionForm from './AddVersionForm'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
  } from "@material-ui/core";
const EditVersionDialog=({isOpen,onCloseHandler,versionToEdit,onUpdateHandler}) =>{
    console.log(`OPEN ${JSON.stringify(isOpen)}`)
    const initialValues = {
      major: "55",
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
        <DialogTitle id="form-dialog-title">Edit Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit version data
          </DialogContentText>
         <AddVersionForm
                initial={initialValues}
                onSubmitHandler={onUpdateHandler}
              />
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
export default EditVersionDialog