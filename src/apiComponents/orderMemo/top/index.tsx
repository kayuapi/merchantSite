import * as React from 'react';
import { FC, ChangeEvent } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOnOutlined';
import MailIcon from '@material-ui/icons/MailOutline';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import { Form } from 'react-final-form';
import { TextInput, useTranslate } from 'react-admin';
import {
    endOfYesterday,
    startOfWeek,
    subWeeks,
    addWeeks,
    startOfMonth,
    subMonths,
} from 'date-fns';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import segments from '../segments/data';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            order: -1,
            width: '15em',
            marginRight: '1em',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    listItem: {
        paddingLeft: '2em',
    },
    listItemText: {
        margin: 0,
    },
    card: {
      maxWidth: 'fit-content',
      marginBottom: '1em',
    }
}));

const Top2: FC = (props) => {
  const { filterValues, setFilters } = props as any;
  const translate = useTranslate();
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <RadioTitle 
              icon={AccessTimeIcon}
              label="resources.orderMemo.filters.date_range"
            />
          </FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="this_week">
            <FormControlLabel
              value="next_week"
              control={
                <Radio 
                  color="primary" 
                  onChange={(event) => {
                    if (event.target.checked === true) {
                      setFilters({
                        ...filterValues,
                        date_range: [
                          `${addWeeks(startOfWeek(new Date()), 1).getTime()}`,
                          `${addWeeks(startOfWeek(new Date()), 2).getTime()}`,
                        ],
                      })
                    }
                  }} 
                />
              }
              label={translate("resources.orderMemo.filters.next_week")}
              labelPlacement="top"
            />
            <FormControlLabel
              value="this_week"
              control={
                <Radio 
                  color="primary" 
                  onChange={(event) => {
                    if (event.target.checked === true) {
                      setFilters({
                        ...filterValues,
                        date_range: [
                          `${startOfWeek(new Date()).getTime()}`,
                          `${addWeeks(startOfWeek(new Date()), 1).getTime()}`,
                        ],
                      })
                    }
                  }} 
                />
              }
              label={translate("resources.orderMemo.filters.this_week")}
              labelPlacement="top"
            />
            <FormControlLabel
              value="last_week"
              control={
                <Radio 
                  color="primary" 
                  onChange={(event) => {
                    if (event.target.checked === true) {
                      setFilters({
                        ...filterValues,
                        date_range: [
                          `${subWeeks(startOfWeek(new Date()),1).getTime()}`,
                          `${startOfWeek(new Date()).getTime()}`,
                        ],
                      })
                    }
                  }} 
                />
              }
              label={translate("resources.orderMemo.filters.last_week")}
              labelPlacement="top"
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  )
}
export const TopFulfillmentMethod: FC = (props) => {
  const { filterValues, setFilters } = props as any;
  const translate = useTranslate();
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <RadioTitle 
              icon={LocalOfferIcon}
              label="resources.orderMemo.filters.fulfillmentMethods"
            />
          </FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="ALL">
            {/* <FormControlLabel
              value="all"
              control={<Radio color="primary" />}
              label={translate("resources.orderMemo.fulfillmentMethods.")}
              labelPlacement="top"
            /> */}
            {segments.map(segment => (
              <FormControlLabel
                value={segment.id}
                control={
                  <Radio 
                    color="primary" 
                    onChange={(event) => {
                      if (event.target.checked === true) {
                        setFilters({
                          ...filterValues,
                          fulfillmentMethod: `${segment.id}`,
                        })
                      }
                    }} 
                  />
                }
                label={translate(segment.name)}
                key={segment.id}
                labelPlacement="top"
              />
            ))}

          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  )
}



const Top: FC = props => {
    const { filterValues, setFilters } = props as any;
    const classes = useStyles(props);
    const translate = useTranslate();

    const setFilter = (values: any) => {
        setFilters({ ...filterValues, ...values });
    };

    // defining this component here allows to skip passing filterValues and setFilter as props
    const FilterButton: FC<{ label: string; value: any }> = props => {
        const { label, value } = props;
        const isSelected = Object.keys(value).reduce(
            (acc, key) => acc && value[key] == filterValues[key], // eslint-disable-line eqeqeq
            true
        );
        const addFilter = () => {
            if (isSelected) {
                // remove the filter
                const inverseValues = Object.keys(value).reduce(
                    (acc, key) => {
                        acc[key] = undefined;
                        return acc;
                    },
                    {} as any
                );
                setFilter(inverseValues);
            } else {
                setFilter(value);
            }
        };
        return (
            <ListItem
                button
                onClick={addFilter}
                selected={isSelected}
                className={classes.listItem}
            >
                <ListItemText
                    primary={translate(label)}
                    className={classes.listItemText}
                />
                {isSelected && (
                    <ListItemSecondaryAction>
                        <IconButton size="small" onClick={addFilter}>
                            <CancelIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                )}
            </ListItem>
        );
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <FilterSection
                    icon={AccessTimeIcon}
                    label="resources.orderMemo.filters.last_visited"
                />
                <List dense disablePadding>
                    <FilterButton
                        value={{
                            last_seen_gte: endOfYesterday().toISOString(),
                            last_seen_lte: undefined,
                        }}
                        label="resources.orderMemo.filters.today"
                    />
                    <FilterButton
                        value={{
                            last_seen_gte: startOfWeek(
                                new Date()
                            ).toISOString(),
                            last_seen_lte: undefined,
                        }}
                        label="resources.orderMemo.filters.this_week"
                    />
                    <FilterButton
                        value={{
                            last_seen_gte: subWeeks(
                                startOfWeek(new Date()),
                                1
                            ).toISOString(),
                            last_seen_lte: startOfWeek(
                                new Date()
                            ).toISOString(),
                        }}
                        label="resources.orderMemo.filters.last_week"
                    />
                    <FilterButton
                        value={{
                            last_seen_gte: startOfMonth(
                                new Date()
                            ).toISOString(),
                            last_seen_lte: undefined,
                        }}
                        label="resources.orderMemo.filters.this_month"
                    />
                    <FilterButton
                        value={{
                            last_seen_gte: subMonths(
                                startOfMonth(new Date()),
                                1
                            ).toISOString(),
                            last_seen_lte: startOfMonth(
                                new Date()
                            ).toISOString(),
                        }}
                        label="resources.orderMemo.filters.last_month"
                    />
                    <FilterButton
                        value={{
                            last_seen_gte: undefined,
                            last_seen_lte: subMonths(
                                startOfMonth(new Date()),
                                1
                            ).toISOString(),
                        }}
                        label="resources.orderMemo.filters.earlier"
                    />
                </List>

                <FilterSection
                    icon={LocalOfferIcon}
                    label="resources.orderMemo.filters.fulfillmentMethods"
                />
                <List dense disablePadding>
                    {segments.map(segment => (
                        <FilterButton
                            value={{ groups: segment.id }}
                            label={segment.name}
                            key={segment.id}
                        />
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

const FilterSection: FC<{ label: string; icon: FC }> = ({
    label,
    icon: Icon,
}) => {
    const translate = useTranslate();
    return (
        <Box mt={2} display="flex" alignItems="center">
            <Box mr={1}>
                <Icon />
            </Box>
            <Typography variant="overline">{translate(label)}</Typography>
        </Box>
    );
};
const RadioTitle: FC<{ label: string; icon: FC }> = ({
  label,
  icon: Icon,
}) => {
  const translate = useTranslate();
  return (
      <Box mt={2} display="flex" alignItems="center">
          <Box mr={1}>
              <Icon />
          </Box>
          <Typography variant="overline">{translate(label)}</Typography>
      </Box>
  );
};

export default Top2;