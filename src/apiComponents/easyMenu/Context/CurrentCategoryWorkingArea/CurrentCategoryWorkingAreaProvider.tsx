import React, { createContext, useReducer, useEffect, useState } from "react";

import { currentCategoryWorkingAreaReducer } from "./currentCategoryWorkingAreaReducer";
import {
  CurrentCategoryWorkingAreaProviderInterface,
  CurrentCategoryWorkingAreaState,
  CurrentCategoryAction,
  CurrentCategoryWorkingAreaContextState
} from "./types";

function getDefaultState(): CurrentCategoryWorkingAreaState {
    const DEFAULT_STATE = {
      currentCategory: false,
      currentCategoryFromCloud: false,
    };

    let stored_state = {};

    return {
      ...DEFAULT_STATE,
      ...stored_state
    };
}

export const CurrentCategoryWorkingAreaContext = createContext<CurrentCategoryWorkingAreaContextState>({
    state: getDefaultState(),
    dispatch: () => {},
});

export const CurrentCategoryWorkingAreaProvider: CurrentCategoryWorkingAreaProviderInterface = ({
    children,
}) => {
    // Holds working area's menu items state
    const [state, dispatch] = useReducer<React.Reducer<CurrentCategoryWorkingAreaState, CurrentCategoryAction>>(
      currentCategoryWorkingAreaReducer,
      getDefaultState()
    );

    const [contextValue, setContextValue] = useState<CurrentCategoryWorkingAreaContextState>({
      state,
      dispatch,
    });

    // Update context value and trigger re-render
    // This patterns avoids unnecessary deep renders
    // https://reactjs.org/docs/context.html#caveats
    useEffect(() => {
        setContextValue((contextValue: CurrentCategoryWorkingAreaContextState) => ({
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
      <CurrentCategoryWorkingAreaContext.Provider value={contextValue}>
        {children}
      </CurrentCategoryWorkingAreaContext.Provider>
    );
};