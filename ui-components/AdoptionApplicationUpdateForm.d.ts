import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { AdoptionApplication } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AdoptionApplicationUpdateFormInputValues = {
    applicationId?: string;
    applicantName?: string;
    email?: string;
    phone?: string;
    submittedAt?: string;
};
export declare type AdoptionApplicationUpdateFormValidationValues = {
    applicationId?: ValidationFunction<string>;
    applicantName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    submittedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AdoptionApplicationUpdateFormOverridesProps = {
    AdoptionApplicationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    applicationId?: PrimitiveOverrideProps<TextFieldProps>;
    applicantName?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    submittedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AdoptionApplicationUpdateFormProps = React.PropsWithChildren<{
    overrides?: AdoptionApplicationUpdateFormOverridesProps | undefined | null;
} & {
    applicationId?: string;
    adoptionApplication?: AdoptionApplication;
    onSubmit?: (fields: AdoptionApplicationUpdateFormInputValues) => AdoptionApplicationUpdateFormInputValues;
    onSuccess?: (fields: AdoptionApplicationUpdateFormInputValues) => void;
    onError?: (fields: AdoptionApplicationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AdoptionApplicationUpdateFormInputValues) => AdoptionApplicationUpdateFormInputValues;
    onValidate?: AdoptionApplicationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AdoptionApplicationUpdateForm(props: AdoptionApplicationUpdateFormProps): React.ReactElement;
