import { Auth } from 'aws-amplify';

const authProvider = {
    login: ({ username, email, password }) =>  Promise.resolve(),
    // login: ({ username }) => {
    //     localStorage.setItem('username', username);
    //     // accept all username/password combinations
    //     return Promise.resolve();
    // },
    // called when the user clicks on the logout button
    logout: () => {
        // localStorage.removeItem('username');
        // localStorage.removeItem('token');
        // return Promise.resolve();
        return Auth.signOut();
    },
    // called when the API returns an error
    checkError: ({ status }) => {

        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => () => Promise.resolve(),
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};

export default authProvider;

// export default {
//     // called when the user attempts to log in
//     login: ({ username }) => {
//         localStorage.setItem('username', username);
//         // accept all username/password combinations
//         return Promise.resolve();
//     },
//     // called when the user clicks on the logout button
//     logout: () => {
//         localStorage.removeItem('username');
//         return Promise.resolve();
//     },
//     // called when the API returns an error
//     checkError: ({ status }) => {
//         if (status === 401 || status === 403) {
//             localStorage.removeItem('username');
//             return Promise.reject();
//         }
//         return Promise.resolve();
//     },
//     // called when the user navigates to a new location, to check for authentication
//     checkAuth: () => {
//         return localStorage.getItem('username')
//             ? Promise.resolve()
//             : Promise.reject();
//     },
//     // called when the user navigates to a new location, to check for permissions / roles
//     getPermissions: () => Promise.resolve(),
// };
