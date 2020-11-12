import React, { createContext, useReducer, useEffect, useState } from "react";

import { variantItemSectionsWorkingAreaReducer } from "./variantItemSectionsWorkingAreaReducer";
import {
  VariantItemSectionsWorkingAreaProviderInterface,
  VariantItemSectionsWorkingAreaState,
  VariantItemSectionsWorkingAreaAction,
  VariantItemSectionsWorkingAreaContextState
} from "./types";

function getDefaultState(): VariantItemSectionsWorkingAreaState {
    const DEFAULT_STATE = {
      variantItemSections: [],
    };

    let stored_state = {};

    return {
      ...DEFAULT_STATE,
      ...stored_state
    };
}

export const VariantItemSectionsWorkingAreaContext = createContext<VariantItemSectionsWorkingAreaContextState>({
    state: getDefaultState(),
    dispatch: () => {},
});

export const VariantItemSectionsWorkingAreaProvider: VariantItemSectionsWorkingAreaProviderInterface = ({
    children,
}) => {
    // Holds working area's menu items state
    const [state, dispatch] = useReducer<React.Reducer<VariantItemSectionsWorkingAreaState, VariantItemSectionsWorkingAreaAction>>(
      variantItemSectionsWorkingAreaReducer,
      getDefaultState()
    );

    const [contextValue, setContextValue] = useState<VariantItemSectionsWorkingAreaContextState>({
      state,
      dispatch,
    });

    // Update context value and trigger re-render
    // This patterns avoids unnecessary deep renders
    // https://reactjs.org/docs/context.html#caveats
    useEffect(() => {
        setContextValue((contextValue: VariantItemSectionsWorkingAreaContextState) => ({
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
      <VariantItemSectionsWorkingAreaContext.Provider value={contextValue}>
        {children}
      </VariantItemSectionsWorkingAreaContext.Provider>
    );
};