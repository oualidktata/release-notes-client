import React from 'react'
import UpdateVersionForm from './UpdateVersionForm'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Badge
  } from "@material-ui/core";
  const EditVersionDialog=({isOpen,onCloseHandler,versionId,onUpdateHandler}) =>{
    console.log(`EditVersionDialog-IsOpen ${JSON.stringify(isOpen)}`)

    return (
        <Dialog
        open={isOpen}
        onClose={onCloseHandler}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Info -id:{versionId} </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Use this form to edit a version basic information
          </DialogContentText>
         <UpdateVersionForm
                versionId={versionId}
                onSubmitHandler={onUpdateHandler}
              />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler} color="primary">
            Cancel
          </Button>
          <Button onClick={onCloseHandler} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
}
export default EditVersionDialog