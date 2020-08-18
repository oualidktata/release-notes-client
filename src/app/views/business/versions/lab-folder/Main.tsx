import React,{useState} from 'react';
import LabAddLinkForm from './Lab-addlinkForm';


type LinkInput = {
    id?: String;
    versionDetailId?: String;
    name: String;
    link: String;
    targetSystemId: String;
    isActive?: Boolean;
  };



const Main = () => {

    const [links,setLinks]=useState([])
    const initialLinkFormValues = {
        id: "",
        versionDetailId: "v1-0001",
        link: "link",
        name: "name",
        isActive: true,
        targetSystemId: "1",
      };
      const onLinkAddedHandler = (e) => {
        // let value = e.target.value;
    
        // let updatedLinks: Array<LinkInput>;
        // updatedLinks = links;
        // let newValue: LinkInput = {
        //   name: value.name,
        //   link: value.link,
        //   targetSystemId: value.targetSystem,
        // };
    
        // updatedLinks.push(newValue);
        // setLinks(links);
        
        console.log(e);
        alert(JSON.stringify(e))
      };

    return (
        <>
        <p>initialLinkFormValues </p>{JSON.stringify(initialLinkFormValues)}
        <LabAddLinkForm initial={initialLinkFormValues} onSubmitHandler={onLinkAddedHandler}/>
        </>
    );
};

export default Main;