import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';

export const withHookHoc = (Component) => {
    return (props) => {
        const [pageNames, setPageNames] = useState([]);
        useEffect(() => {
            const myInit = {
                headers: {
                },
                response: false
            };
            async function grabPageNames() {
                const apiName = 'amplifyChmboxOrderingApi';
                const basePath = '/uiplugin/object';
                try {
                    const currentUserInfo = await Auth.currentUserInfo();
                    const path = `${basePath}/${currentUserInfo.id}/PluginMenuPages`;
                    const pageNamesReponse = await API.get(apiName, path, myInit);
                    console.log('pageNamesResponse', pageNamesReponse);
                    setPageNames(pageNamesReponse);
                }
                catch(err) {
                    console.log('pageNames api response error', err.response);
                }
            }
            grabPageNames();
        }, []);
        return (
            <Component pageNames={pageNames} {...props} />
        )
    };
};