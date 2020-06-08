import React from 'react';
import {
    Edit,
    FormTab,
    NumberInput,
    ImageInput,
    ImageField,
    ReferenceInput,
    SelectInput,
    TabbedForm,
    TextInput,
    required,
} from 'react-admin';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

export const styles = {
    price: { width: '7em' },
    stock: { width: '7em' },
};

const useStyles = makeStyles(styles);

const MenuItemEdit = props => {
    const classes = useStyles();
    return (
        <Edit {...props}>
            <TabbedForm>
                <FormTab label="resources.choices.tabs.image">
                    {/* <ImageInput
                        autoFocus
                        fullwidth
                        source="image"
                        multiple={false}
                        label="resources.choices.fields.upload_image"
                        validate={required()}
                        accept="image/*"
                    >
                        <ImageField source="src" title="title" />
                    </ImageInput> */}
                </FormTab>
                <FormTab label="resources.choices.tabs.details" path="details">
                    <TextInput source="title" validate={required()} />
                    <NumberInput
                        source="price"
                        validate={required()}
                        className={classes.price}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    RM
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/* <ReferenceInput
                        source="category_id"
                        reference="categories"
                    >
                        <SelectInput source="name" />
                    </ReferenceInput> */}
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default MenuItemEdit;

