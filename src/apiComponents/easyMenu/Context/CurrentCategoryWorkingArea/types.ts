import { ReactNode, Dispatch } from "react";
import { Id } from "../../../orderMemo/types";

export type CurrentCategory = {
  id: Id;
  pageId: string;
  name: string;
  status?: "ENABLED" | "DISABLED" | null;
} | boolean;

export type CurrentCategoryAttributeKey = 
  "pageId" | 
  "name" | 
  "status";

export type CurrentCategoryWorkingAreaState = {
  currentCategory: CurrentCategory;
  currentCategoryFromCloud: CurrentCategory;
};
export type CurrentCategoryAttributeValuePageIdType = string;
export type CurrentCategoryAttributeValueNameType = string;
export type CurrentCategoryAttributeValueStatusType = "" | "DISABLED";

export type CurrentCategoryAction =
  | {
    type: "loadCurrentCategory";
    currentCategory: CurrentCategory;
    }
  | {
    type: "loadCurrentCategoryFromCloud";
    currentCategoryFromCloud: CurrentCategory;
    }    
  | {
    type: "updateCurrentCategory";
    attributeKey: CurrentCategoryAttributeKey;
    attributeValue: 
      CurrentCategoryAttributeValuePageIdType | 
      CurrentCategoryAttributeValueNameType |
      CurrentCategoryAttributeValueStatusType;
    }
  | {
    type: "resetCurrentCategory";
  };


export interface useCurrentCategoryWorkingAreaInterface {
  (currentCategory: CurrentCategory): {
      isCurrentCategoryDirty: boolean;
      currentCategory: CurrentCategory;
      loadCurrentCategory: (currentCategory: CurrentCategory) => void;
      updateCurrentCategory: (attributeKey: CurrentCategoryAttributeKey, attributeValue: any) => void;
      resetCurrentCategory: () => void;
  };
}

export type CurrentCategoryWorkingAreaDispatch = Dispatch<CurrentCategoryAction>;

export type CurrentCategoryWorkingAreaProviderInterface = ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;

// export type AuthProviderInterface = ({
//   children,
//   navigate,
//   auth0_domain,
//   auth0_audience_domain,
//   auth0_client_id,
//   auth0_params,
//   customPropertyNamespace
// }: {
//   children: ReactNode;
//   navigate: (path: string) => void;
//   auth0_domain: string;
//   auth0_audience_domain: string;
//   auth0_client_id: string;
//   auth0_params: AuthOptions;
//   customPropertyNamespace: string;
// }) => JSX.Element;

export type CurrentCategoryWorkingAreaContextState = {
  state: CurrentCategoryWorkingAreaState;
  dispatch: CurrentCategoryWorkingAreaDispatch;
};