import React, { createContext, useReducer, useEffect, useState } from "react";

import { variantItemsALaCarteWorkingAreaReducer } from "./variantItemsALaCarteWorkingAreaReducer";
import {
  VariantItemsALaCarteWorkingAreaProviderInterface,
  VariantItemsALaCarteWorkingAreaState,
  VariantItemsALaCarteWorkingAreaAction,
  VariantItemsALaCarteWorkingAreaContextState
} from "./types";

function getDefaultState(): VariantItemsALaCarteWorkingAreaState {
    const DEFAULT_STATE = {
      variantItems: [],
    };

    let stored_state = {};

    return {
      ...DEFAULT_STATE,
      ...stored_state
    };
}

export const VariantItemsALaCarteWorkingAreaContext = createContext<VariantItemsALaCarteWorkingAreaContextState>({
    state: getDefaultState(),
    dispatch: () => {},
});

export const VariantItemsALaCarteWorkingAreaProvider: VariantItemsALaCarteWorkingAreaProviderInterface = ({
    children,
}) => {
    // Holds working area's menu items state
    const [state, dispatch] = useReducer<React.Reducer<VariantItemsALaCarteWorkingAreaState, VariantItemsALaCarteWorkingAreaAction>>(
      variantItemsALaCarteWorkingAreaReducer,
      getDefaultState()
    );

    const [contextValue, setContextValue] = useState<VariantItemsALaCarteWorkingAreaContextState>({
      state,
      dispatch,
    });

    // Update context value and trigger re-render
    // This patterns avoids unnecessary deep renders
    // https://reactjs.org/docs/context.html#caveats
    useEffect(() => {
        setContextValue((contextValue: VariantItemsALaCarteWorkingAreaContextState) => ({
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
      <VariantItemsALaCarteWorkingAreaContext.Provider value={contextValue}>
        {children}
      </VariantItemsALaCarteWorkingAreaContext.Provider>
    );
};