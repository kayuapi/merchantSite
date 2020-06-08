import React from 'react';
import {
    Create,
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

const MenuItemCreate = props => {
    const classes = useStyles();
    return (
        <Create {...props}>
            <TabbedForm redirect="list">
                <FormTab label="resources.choices.tabs.image">
                    <ImageInput
                        autoFocus
                        fullwidth
                        source="image"
                        multiple={false}
                        label="resources.choices.fields.upload_image"
                        // validate={required()}
                        accept="image/*"
                    >
                        <ImageField source="src" title="title" />
                    </ImageInput>
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
                    <ReferenceInput
                        source="category_id"
                        reference="categories"
                        allowEmpty
                    >
                        <SelectInput source="id" optionText="name" />
                    </ReferenceInput>
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default MenuItemCreate;

