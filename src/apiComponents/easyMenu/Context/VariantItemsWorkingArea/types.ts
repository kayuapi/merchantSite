import { ReactNode, Dispatch } from "react";
import { Id } from "../../../orderMemo/types";

export type VariantItem = {
  id: Id,
  name: string,
  price: string,
}

export type VariantItemSection = {
  id: Id,
  title: string;
  required: boolean;
  minSelectionNumber: number;
  maxSelectionNumber: number;
  details: VariantItem[];
};

export type VariantItemSectionAttributeKey = 
  "title" | 
  "required" | 
  "minSelectionNumber" | 
  "maxSelectionNumber" | 
  "details";

export type VariantItemSectionsWorkingAreaState = {
  variantItemSections: VariantItemSection[];
};
export type VariantItemSectionAttributeValueTitleType = string;
export type VariantItemSectionAttributeValueRequiredType = boolean;
export type VariantItemSectionAttributeValueMinSelectionNumberType = number;
export type VariantItemSectionAttributeValueMaxSelectionNumberType = number;
export type VariantItemSectionAttributeValueDetailsType = VariantItem[];

export type VariantItemSectionsWorkingAreaAction =
  | {
    type: "loadVariantItemSections";
    variantItemSections: VariantItemSection[];
    }
  | {
      type: "updateVariantItemSection";
      id: Id;
      attributeKey: VariantItemSectionAttributeKey;
      attributeValue: 
        VariantItemSectionAttributeValueTitleType | 
        VariantItemSectionAttributeValueRequiredType |
        VariantItemSectionAttributeValueMinSelectionNumberType |
        VariantItemSectionAttributeValueMaxSelectionNumberType |
        VariantItemSectionAttributeValueDetailsType;
    }
  | {
      type: "updateVariantItemSectionDetails";
      variantItemSectionId: Id;
      detailsId: Id;
      subAction: "create" | "update" | "delete";
      attributeKey: "name" | "price";
      attributeValue?: string | number | null;
    }
  | {
      type: "createVariantItemSection";
    }
  | {
      type: "deleteVariantItemSection";
      id: Id;
    };


export interface useVariantItemSectionsWorkingAreaInterface {
  (): {
      variantItemSections: VariantItemSection[];
      loadVariantItemSections: (variantItemSections: VariantItemSection[]) => void;
      updateVariantItemSection: (id: Id, attributeKey: VariantItemSectionAttributeKey, attributeValue: any) => void;
      updateVariantItemSectionDetails: (variantItemSectionId: any, detailsId: any, subAction: any, attributeKey: any, attributeValue: any) => void;
      createVariantItemSection: () => void;
      deleteVariantItemSection: (id: Id) => void;
  };
}

export type VariantItemSectionsWorkingAreaDispatch = Dispatch<VariantItemSectionsWorkingAreaAction>;

export type VariantItemSectionsWorkingAreaProviderInterface = ({
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

export type VariantItemSectionsWorkingAreaContextState = {
  state: VariantItemSectionsWorkingAreaState;
  dispatch: VariantItemSectionsWorkingAreaDispatch;
};