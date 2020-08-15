import '@progress/kendo-theme-material/dist/all.css';
import React from 'react';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Window } from '@progress/kendo-react-dialogs';
const categories=[
    {"CategoryID": 1, "CategoryName": "Beverages"},
    {"CategoryID": 2, "CategoryName": "Condiments"},
    {"CategoryID": 3, "CategoryName": "Confections"},
    {"CategoryID": 4, "CategoryName": "Dairy Products"},
    {"CategoryID": 5, "CategoryName": "Grains/Cereals"},
    {"CategoryID": 6, "CategoryName": "Meat/Poultry"},
    {"CategoryID": 7, "CategoryName": "Produce"},
    {"CategoryID": 8, "CategoryName": "Seafood"}
  ]

const LinkList2 = () => {
    return (
        <div>
            
<p>
  <DropDownList
    data={categories}
    dataItemKey="CategoryID"
    textField="CategoryName"
    />
</p>

            
        </div>
    );
};

export default LinkList2;