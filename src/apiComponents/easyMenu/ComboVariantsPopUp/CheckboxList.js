import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import Checkbox from '@material-ui/core/Checkbox';
import { Controller } from "react-hook-form";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    padding: '0px',
  },
  inputRight: {
    textAlign: 'end',
  }
}));

export default function CheckboxList({ variantItemSectionId, items, disabled = false, editable= false, updateVariantItemSectionDetail }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   if (! disabled) {
  //     setChecked(newChecked);
  //   }
  // };

  return (
    <List dense={false} className={classes.root}>
      {items && items.map(({id, name, price}) => {
        const labelId = `checkbox-list-label-${id}`;
        return (
          // <ListItem key={id} role={undefined} dense button={!editable} onClick={handleToggle(id)}>
          <ListItem key={id} role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                classes={{root: classes.icon}}
                checked={checked.indexOf(id) !== -1}
                tabIndex={-1}
                disabled={disabled}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            {!editable && 
              <>
                <ListItemText style={{ maxWidth: '80%' }} id={labelId} primary={name} />
                <ListItemSecondaryAction>
                  <ListItemText id={labelId} primary={`+${price}`} />
                </ListItemSecondaryAction>
              </>
            }
{/* 
<InputBase
                  onBlur={(e)=>{updateVariantItemSection(id, 'title', e.target.value); onBlur();}}
                  onChange={onChange}
                  value={value}
                  placeholder="Choice of Beverage"
                  classes={{input: classes.productTitleInput}}
                  style={{width: '100%'}}
                  inputProps={{'aria-label': 'put product title' }} 
                />
 */}


            {editable && 
              <>
                {/* <ListItemText id={labelId} primary={<InputBase defaultValue={name} />} /> */}
                <ListItemText id={labelId} primary={
                  <Controller
                    name={`name-${id}`}
                    defaultValue={name}
                    render={({onChange, onBlur, value}) => (
                      <InputBase
                        onBlur={(e)=>{updateVariantItemSectionDetail(variantItemSectionId, id, 'update', 'name', e.target.value); onBlur();}}
                        onChange={onChange}
                        value={value}
                        placeholder="Choice of Beverage"
                        classes={{input: classes.productTitleInput}}
                        style={{width: '100%'}}
                        inputProps={{'aria-label': 'put product title' }} 
                      />
                    )}
                  />}
                />
                <ListItemText id={labelId} primary={
                  <Controller
                    name={`price-${id}`}
                    defaultValue={price}
                    render={({onChange, onBlur, value}) => (
                      <InputBase
                        onBlur={(e)=>{updateVariantItemSectionDetail(variantItemSectionId, id, 'update' ,'price', e.target.value); onBlur();}}
                        onChange={onChange}
                        value={value}
                        placeholder="Choice of Beverage"
                        classes={{input: classes.inputRight}}
                        style={{width: '100%'}}
                        inputProps={{'aria-label': 'put product title' }} 
                      />
                    )}
                  />} 
                />
                <ListItemText>
                    <IconButton onClick={() => {updateVariantItemSectionDetail(variantItemSectionId, id, 'delete');}} size="small" edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemText>
              </>
            }
          </ListItem>
        );
      })}
    </List>
  );
}