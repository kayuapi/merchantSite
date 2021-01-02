import { ReactNode, Dispatch } from "react";
import { Id } from "../../../orderMemo/types";

export type MenuItem = {
  id: Id;
  name: string;
  price: string;
  image: string;
  type: "A_LA_CARTE" | "COMBO";
  uiLocation: {[key: string]: any};
  description?: string;
  variants?: {[key: string]: any}[] | null;
  comboVariants?: {[key: string]: any}[] | null;
};

export type MinimumRequiredParametersForRGLObject = {
  x: number,
  y: number,
  w: number,
  h: number,
  minH: number
};

export type MenuItemAttributeKey = 
  "name" | 
  "price" | 
  "image" | 
  "type" | 
  "uiLocation" | 
  "description" |
  "variants" | 
  "comboVariants";

export type MenuItemsWorkingAreaState = {
  menuItems: MenuItem[];
};
export type MenuItemAttributeValueNameType = string;
export type MenuItemAttributeValuePriceType = string;
export type MenuItemAttributeValueImageType = string;
export type MenuItemAttributeValueTypeType = "A_LA_CARTE" | "COMBO";
export type MenuItemAttributeValueDescriptionType = string;
export type MenuItemAttributeValueRGLLayoutType = {[key: string]: any}[];
export type MenuItemAttributeValueVariantsType = {[key: string]: any}[];
export type MenuItemAttributeValueComboVariantsType = {[key: string]: any}[];


export type MenuItemAction =
  | {
    type: "loadMenuItems";
    menuItems: MenuItem[];
    }
  | {
      type: "updateMenuItem";
      id: Id;
      attributeKey: MenuItemAttributeKey;
      attributeValue: 
        MenuItemAttributeValueNameType | 
        MenuItemAttributeValuePriceType |
        MenuItemAttributeValueImageType |
        MenuItemAttributeValueTypeType |
        MenuItemAttributeValueDescriptionType |
        MenuItemAttributeValueVariantsType |
        MenuItemAttributeValueComboVariantsType;
    }
  | {
      type: "updateMenuItemLayout";
      layout: MenuItemAttributeValueRGLLayoutType;
    }
  | {
      type: "createMenuItem";
      uiLocation: MinimumRequiredParametersForRGLObject;
    }
  | {
      type: "deleteMenuItem";
      id: Id;
    };


export interface useMenuItemsWorkingAreaInterface {
  (): {
      menuItems: MenuItem[];
      loadMenuItems: (menuItems: MenuItem[]) => void;
      updateMenuItem: (id: Id, attributeKey: MenuItemAttributeKey, attributeValue: any) => void;
      updateMenuItemLayout: (layout: MenuItemAttributeValueRGLLayoutType) => void;
      createMenuItem: (location: MinimumRequiredParametersForRGLObject) => void;
      deleteMenuItem: (id: Id) => void;
  };
}

export type MenuItemsWorkingAreaDispatch = Dispatch<MenuItemAction>;

export type MenuItemsWorkingAreaProviderInterface = ({
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

export type MenuItemsWorkingAreaContextState = {
  state: MenuItemsWorkingAreaState;
  dispatch: MenuItemsWorkingAreaDispatch;
};