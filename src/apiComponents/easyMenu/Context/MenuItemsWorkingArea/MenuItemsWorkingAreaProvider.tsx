import React, { createContext, useReducer, useEffect, useState } from "react";

import { menuItemsWorkingAreaReducer } from "./menuItemsWorkingAreaReducer";
import {
  MenuItemsWorkingAreaProviderInterface,
  MenuItemsWorkingAreaState,
  MenuItemAction,
  MenuItemsWorkingAreaContextState
} from "./types";

function getDefaultState(): MenuItemsWorkingAreaState {
    const DEFAULT_STATE = {
      menuItems: [],
    };

    let stored_state = {};

    return {
      ...DEFAULT_STATE,
      ...stored_state
    };
}

export const MenuItemsWorkingAreaContext = createContext<MenuItemsWorkingAreaContextState>({
    state: getDefaultState(),
    dispatch: () => {},
});

export const MenuItemsWorkingAreaProvider: MenuItemsWorkingAreaProviderInterface = ({
    children,
}) => {
    // Holds working area's menu items state
    const [state, dispatch] = useReducer<React.Reducer<MenuItemsWorkingAreaState, MenuItemAction>>(
      menuItemsWorkingAreaReducer,
      getDefaultState()
    );

    const [contextValue, setContextValue] = useState<MenuItemsWorkingAreaContextState>({
      state,
      dispatch,
    });

    // Update context value and trigger re-render
    // This patterns avoids unnecessary deep renders
    // https://reactjs.org/docs/context.html#caveats
    useEffect(() => {
        setContextValue((contextValue: MenuItemsWorkingAreaContextState) => ({
            ...contextValue,
            state
        }));
    }, [state]);

    // Verify user is logged-in on AuthProvider mount
    // Avoids storing sensitive data in local storage
    // useEffect(() => {
    //     dispatch({
    //         type: "startAuthenticating"
    //     });

    //     auth0.checkSession({}, (err, authResult) => {
    //         dispatch({
    //             type: "stopAuthenticating"
    //         });

    //         console.log(err);
    //         if (err) {
    //             dispatch({
    //                 type: "error",
    //                 errorType: "checkSession",
    //                 error: err
    //             });
    //         } else {
    //             handleAuthResult({ dispatch, auth0, authResult });
    //         }
    //     });
    // }, []);

    return (
      <MenuItemsWorkingAreaContext.Provider value={contextValue}>
        {children}
      </MenuItemsWorkingAreaContext.Provider>
    );
};