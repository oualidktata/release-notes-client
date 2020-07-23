import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField
  } from "@material-ui/core";
  import SimpleForm from '../../material-kit/forms/SimpleForm'
const EditVersion=({isOpen,onCloseHandler,versionToEdit}) =>{
    console.log(`OPEN ${JSON.stringify(isOpen)}`)
    
    return (
        <Dialog
        open={isOpen}
        onClose={onCloseHandler}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
         <SimpleForm/>
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
export default EditVersion