import React from 'react'
import AddDetailForm from './AddDetailForm'
import VersionDetailList from './VersionDetailList'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
  } from "@material-ui/core";


const EditDetailsDialog=({isOpen,onCloseHandler,versionId}) =>{

 
//const versionId="v1"


// const [versionToEdit,setVersionToEdit]=useState(null);

    console.log(`EditDialog VersionId ${JSON.stringify(versionId)}`)
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
    Edit details for version: {initialValues.major}.{initialValues.minor}.{initialValues.patch}
          </DialogContentText>
         <AddDetailForm  versionId={versionId}/>
         <VersionDetailList versionId={versionId}/>
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