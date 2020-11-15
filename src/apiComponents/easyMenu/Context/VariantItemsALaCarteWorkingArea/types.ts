import { ReactNode, Dispatch } from "react";
import { Id } from "../../../orderMemo/types";

export type VariantItem = {
  id: Id,
  name: string,
  price: string,
}

export type VariantItemALaCarteAttributeKey = 
  "name" | 
  "price";

export type VariantItemsALaCarteWorkingAreaState = {
  variantItems: VariantItem[];
};
export type VariantItemAttributeValueNameType = string;
export type VariantItemAttributeValuePriceType = string;

export type VariantItemsALaCarteWorkingAreaAction =
  | {
    type: "loadVariantItems";
    variantItems: VariantItem[];
    }
  | {
      type: "updateVariantItem";
      variantItemId: Id;
      attributeKey: VariantItemALaCarteAttributeKey;
      attributeValue?: VariantItemAttributeValueNameType | VariantItemAttributeValuePriceType | null;
    }
  | {
      type: "createVariantItem";
    }
  | {
      type: "deleteVariantItem";
      variantItemId: Id;
    }

export interface useVariantItemsALaCarteWorkingAreaInterface {
  (): {
      variantItems: VariantItem[];
      loadVariantItems: (variantItems: VariantItem[]) => void;
      updateVariantItem: (variantItemId: Id, attributeKey: VariantItemALaCarteAttributeKey, attributeValue: any) => void;
      createVariantItem: () => void;
      deleteVariantItem: (id: Id) => void;
  };
}

export type VariantItemsALaCarteWorkingAreaDispatch = Dispatch<VariantItemsALaCarteWorkingAreaAction>;

export type VariantItemsALaCarteWorkingAreaProviderInterface = ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;

export type VariantItemsALaCarteWorkingAreaContextState = {
  state: VariantItemsALaCarteWorkingAreaState;
  dispatch: VariantItemsALaCarteWorkingAreaDispatch;
};