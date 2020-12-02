/**
 *
 * Product
 *
 */

import React, { useState} from 'react';

import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import ReactCardFlip from 'react-card-flip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import CheckboxList from './CheckboxList';

import InputBase from '@material-ui/core/InputBase';
import { Controller } from "react-hook-form";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useVariantItemSectionsWorkingArea } from '../Context/VariantItemsWorkingArea/useVariantItemSectionsWorkingArea';

import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  productTitleInput: {
    fontSize: '1.25rem',
    fontFamily: "Roboto",
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
  },
  root: {
    // minWidth: 275,
    // marginBottom: '1em',
    // maxWidth: 275,
    // width: '99%',
    // height: '99%',
  },
  selectionNumber: {
    width: '8ch',
  }
}));

export function VariantItemSectionCard({ 
    variantItemSection: {
      id,
      title,
      required,
      minSelectionNumber,
      maxSelectionNumber,
      details,
    }
  }) {
  const classes = useStyles();

  const [isFlipped, setIsFlipped] = useState(false);
  const { updateVariantItemSection, deleteVariantItemSection, updateVariantItemSectionDetails } = useVariantItemSectionsWorkingArea();
  return (
    <ReactCardFlip isFlipped={isFlipped} containerStyle={{marginBottom: '1rem'}}>

      <Card className={classes.root}>
        <CardContent>
          <Grid container justify="space-between">  
            <Typography variant="h6">
              {title}
            </Typography>
            {required && <Chip color="primary" size="small" label="Required" />}
            {!required && <Chip color="primary" size="small" label="Optional" />}
          </Grid>
          {minSelectionNumber !== maxSelectionNumber && 
            <>
              <Chip color="primary" variant="outlined" size="small" label={`Min:${minSelectionNumber}`} />
              <Chip color="primary" variant="outlined" size="small" label={`Max:${maxSelectionNumber}`} />          
            </>
          }
          {minSelectionNumber === maxSelectionNumber && 
            <Chip color="primary" variant="outlined" size="small" label={`Select ${minSelectionNumber} only.`} />
          }
          <CheckboxList variantItemSectionId={id} items={details}  />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setIsFlipped(prev => !prev)}>Edit</Button>
          <Button size="small" onClick={() => deleteVariantItemSection(id)}>Delete</Button>
        </CardActions>
      </Card>

      <Card className={classes.root}>
        <CardContent>
          <Controller
            name={`title-${id}`}
            defaultValue={title}
            render={({onChange, onBlur, value}) => (
              <InputBase
                onBlur={(e)=>{updateVariantItemSection(id, 'title', e.target.value); onBlur();}}
                onChange={onChange}
                value={value}
                placeholder="Choice of Beverage"
                classes={{input: classes.productTitleInput}}
                style={{width: '100%'}}
                inputProps={{'aria-label': 'put product title' }} 
              />
            )}
          />
          <Grid container justify="space-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={required}
                  onChange={(e)=>{updateVariantItemSection(id, 'required', e.target.checked)}}
                  name="Required"
                  color="primary"
                />
              }
              label="Required"
            />
            <div>
              <TextField className={classes.selectionNumber} inputProps={{ type: 'number'}} onChange={(e)=>{updateVariantItemSection(id, 'minSelectionNumber', parseInt(e.target.value))}} size="small" id="outlined-basic" label="Min" variant="outlined" />
              <TextField className={classes.selectionNumber} inputProps={{ type: 'number'}} onChange={(e)=>{updateVariantItemSection(id, 'maxSelectionNumber', parseInt(e.target.value))}} size="small" id="outlined-basic2" label="Max" variant="outlined" />
            </div>
          </Grid>
          <CheckboxList disabled={true} variantItemSectionId={id} updateVariantItemSectionDetail={updateVariantItemSectionDetails} items={details} editable={true} />
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            onClick={() => {
              setIsFlipped(prev => !prev);
            }}
          >
            Ok
          </Button>
          <Button size="small" onClick={() => {updateVariantItemSection(id, 'details', [...details, {id: uuidv4(), name: 'tes1', price: 'RM5'}])}}>Add item</Button>
        </CardActions>
      </Card>

    </ReactCardFlip>
  );
}

VariantItemSectionCard.propTypes = {
  variantItemSection: PropTypes.object,
};

export default VariantItemSectionCard;