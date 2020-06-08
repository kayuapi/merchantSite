import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Sidebar } from 'react-admin';
import Menu from './Menu';
import { darkTheme, lightTheme } from './themes';

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

export default (props: any) => {
    const theme = useSelector((state) =>
        state.theme === 'dark' ? darkTheme : lightTheme
    );
    return (
        <Layout
            {...props}
            sidebar={CustomSidebar}
            menu={Menu}
            theme={theme}
        />
    );
};

