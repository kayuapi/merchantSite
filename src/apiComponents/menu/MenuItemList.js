import React from 'react';
import {
    Filter,
    List,
    ReferenceInput,
    SelectInput,
} from 'react-admin';
// import Chip from '@material-ui/core/Chip';
// import { makeStyles } from '@material-ui/core/styles';
import GridList from './GridList';

// const useQuickFilterStyles = makeStyles(theme => ({
//     root: {
//         marginBottom: theme.spacing(3),
//     },
// }));

export const ChoiceFilter = props => (
    <Filter {...props}>
        <ReferenceInput
            source="category_id"
            reference="categories"
            sort={{ field: 'id', order: 'ASC' }}
        >
            <SelectInput source="name" />
        </ReferenceInput>
    </Filter>
);

const MenuItemList = props => (
    <List
        {...props}
        filters={<ChoiceFilter />}
        perPage={20}
        sort={{ field: 'id', order: 'ASC' }}
    >
        <GridList />
    </List>
);

export default MenuItemList;

