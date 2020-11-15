import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { useVariantItemsALaCarteWorkingArea } from '../Context/VariantItemsALaCarteWorkingArea/useVariantItemsALaCarteWorkingArea';

import InputBase from '@material-ui/core/InputBase';
import { Controller } from "react-hook-form";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function VariantItemRow({ variantItem: {id, name, price} }) {
  const { updateVariantItem, deleteVariantItem } = useVariantItemsALaCarteWorkingArea();
  return (
    <>
      <TableRow key={id}>
        <TableCell style={{minWidth: '2rem', padding: '0 10px 0 0'}}>
          <Controller
            name={`name-${id}`}
            defaultValue={name}
            render={({onChange, onBlur, value}) => (
              <InputBase
                onBlur={(e)=>{updateVariantItem(id, 'name', e.target.value); onBlur();}}
                onChange={onChange}
                value={value}
                placeholder="e.g: Variant 1"
                // classes={{input: classes.productTitleInput}}
                style={{width: '100%'}}
                multiline
                inputProps={{'aria-label': 'put variant name' }} 
              />
            )}
          />
        </TableCell>
        <TableCell style={{ width: '12ch' }} align="right">
          <Controller
            name={`price-${id}`}
            defaultValue={price}
            render={({onChange, onBlur, value}) => (
              <InputBase
                onBlur={(e)=>{updateVariantItem(id, 'price', e.target.value); onBlur();}}
                onChange={onChange}
                value={value}
                placeholder="e.g: RM 5 "
                // classes={{input: classes.productTitleInput}}
                style={{width: '100%'}}
                multiline
                inputProps={{'aria-label': 'put variant price' }} 
              />
            )}
          />
        </TableCell>
        <TableCell align="center">
          <IconButton
            size="medium"
            aria-label="add variant"
            disabled={true}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </TableCell>
        <TableCell style={{ minWidth: '4ch' }} align="right">
          <Typography style={{color: '#777'}}>0</Typography>
        </TableCell>
        <TableCell align="center">
          <IconButton
            size="medium"
            aria-label="minus variant"
            disabled={true}
          >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton
            size="small"
            onClick={()=> {deleteVariantItem(id)}}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </TableCell>

      </TableRow>
    </>
  );
}