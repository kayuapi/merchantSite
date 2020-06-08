import React from 'react';
import { Datagrid, EditButton, List, TextField } from 'react-admin';

import LinkToRelatedChoices from './LinkToRelatedChoices';

const CategoryList = (props) => {
    return(
    <List {...props} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid>
            <TextField source="name" />
            {/* <LinkToRelatedChoices /> */}
            <EditButton />
        </Datagrid>
    </List>);
};

export default CategoryList;

