import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    useTranslate,
    required,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    name: { width: 544 },
};

const useStyles = makeStyles(styles);

const CategoryEdit = (props: any) => {
    const classes = useStyles();

    return (
        <Edit {...props}>
            <SimpleForm>
                <SectionTitle label="resources.categories.name" />
                <TextInput
                    autoFocus
                    source="name"
                    fullWidth={true}
                    formClassName={classes.name}
                    // validate={requiredValidate}
                />
                <Separator />
            </SimpleForm>
        </Edit>
    );
};

const requiredValidate = [required()];

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label)}
        </Typography>
    );
};

const Separator = () => <Box pt="1em" />;

export default CategoryEdit;