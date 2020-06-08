import React, { useState } from "react";
import { AppBar, Tabs, Tab, Grid, Button, InputBase } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import { render } from "@testing-library/react";
import ToggleButton from '@material-ui/lab/ToggleButton';
import EditIcon from '@material-ui/icons/Edit';
import TabList from '@material-ui/lab/TabList';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// const nestedComponent = React.forwardRef((props, ref) => {
//   return (
//     <input />
//   )
// })
// const TabComponent1 = React.forwardRef((props, ref) => 
//     <InputBase defaultValue={props.categoryValue} />
//   );
// const tabComponent2 = React.forwardRef((props, ref) => {
//   const classes = useStyles();
//   return (
//     <InputBase ref={ref} classes={{input: classes.input}} defaultValue={props.categoryValue} />
//   )
//   });

// const tabComponent3 = React.forwardRef((props, ref) => {
//   const classes = useStyles();
//   const values = props.getValues();
//   return (
//     <Controller
//       as={<InputBase />}
//       name={`menuPages[${props.index}]`}
//       defaultValue={values[`menuPages[${props.index}]`]}
//       control={props.control}
//       placeholder="Enter Page Name"
//       classes={{input: classes.input}}
//     />
//   )
//   });

// const TabComponent5 = (props) => {
//   const values = props.getValues();
//   return (
//     <Controller
//       as={<Tab />}
//       name={`menuPages[${props.index}].name`}
//       defaultValue={values[`menuPages[${props.index}].name`]}
//       control={props.control}
//       placeholder="Enter Page Name"
//       {...props}
//     />
//   )
// }
    
// function EditableTab(props) {
//   return (
//     <Tab
//       component={TabComponent1}
//       // onClick={(event) => {
//       //   event.preventDefault();
//       // }}
//       {...props}
//     />
//   );
// }

// const defaultValues = {
//   menuPages: [{ 
//             id: 0,
//             name: "page1", 
//           }, 
//           {
//             id: 1,
//             name: "page2", 
//           }, 
//           {
//             id: 2,
//             name: "page3", 
//           },
//           {
//             id: 3,
//             name: "page4", 
//           },
//           {
//             id: 4,
//             name: "page5", 
//           },
//           {
//             id: 5,
//             name: "page6", 
//           },
//         ]
// };
const useStyles = makeStyles(theme => ({
  button: {
    'margin': theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    width: '100%',
    bottom: theme.spacing(10),
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    // flex: '1 1 auto',
  },
  cardGrid: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    height: '100%',
  },
  input: {
    width: 'auto',
    color: 'white',
  },
  iconButton: {
    color: 'white',
  }
}
));
const ToggleaEditableTab = props => {
  const classes = useStyles();
  const [categoryEditable, setCategoryEditable] = React.useState(false);

  return(
    <AppBar position="static" className={classes.appBar}>
      <ToggleButton 
        value="editable"
        selected={categoryEditable}
        onChange={() => {
          setCategoryEditable(!categoryEditable);
        }}  
      >
        <EditIcon />
      </ToggleButton>

      {!categoryEditable && 
        <TabList onChange={handleChange} aria-label="simple tabs example" variant="scrollable"> 
          {fields.length && _.map(pages, (el, id) => {
            if (el) {
              return <Tab key={el} label={el} value={id.toString()} />
            }
            return <Tab key={el} label={el} value={id.toString()} />
            
          })}
            {/* return <TabComponent5 key={el.name} label={el.name} value={id.toString()} getValues={getValues} control={control} index={id} />})} */}
        </TabList>}

      {categoryEditable && 
        <TabList onChange={handleChange} aria-label="simple tabs example" variant="scrollable"> 
          {_.map(fields, (el, id) => {
            console.log('editEl', el);
            return <Tab key={id} 
                      label={el.value} 
                      value={id.toString()} 
                      categoryValue={el.value} 
                      component={tabComponent3} 
                      disableRipple={true}
                      index={id} 
                      control={control} 
                      getValues={getValues} />})}
            {/* return <EditableTab key={el} label={el} value={id.toString()} categoryValue={el} />})} */}
            {/* return <InputBase key={el} label={el} />})} */}
        </TabList>}
    </AppBar>
  )
}
