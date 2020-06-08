import React from 'react';
import {
    Create,
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

const CategoryCreate = (props: any) => {
    const classes = useStyles();

    return (
        <Create {...props}>
            <SimpleForm redirect="list">
                <SectionTitle label="resources.categories.name" />
                <TextInput
                    autoFocus
                    source="name"
                    fullWidth={true}
                    formClassName={classes.name}
                    validate={requiredValidate}
                />
                <Separator />
            </SimpleForm>
        </Create>
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

export default CategoryCreate;