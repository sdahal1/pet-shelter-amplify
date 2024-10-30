import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type AdoptionApplicationCreateFormInputValues = {
    applicationId?: string;
    applicantName?: string;
    email?: string;
    phone?: string;
    submittedAt?: string;
};
export declare type AdoptionApplicationCreateFormValidationValues = {
    applicationId?: ValidationFunction<string>;
    applicantName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    submittedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AdoptionApplicationCreateFormOverridesProps = {
    AdoptionApplicationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    applicationId?: PrimitiveOverrideProps<TextFieldProps>;
    applicantName?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    submittedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AdoptionApplicationCreateFormProps = React.PropsWithChildren<{
    overrides?: AdoptionApplicationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AdoptionApplicationCreateFormInputValues) => AdoptionApplicationCreateFormInputValues;
    onSuccess?: (fields: AdoptionApplicationCreateFormInputValues) => void;
    onError?: (fields: AdoptionApplicationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AdoptionApplicationCreateFormInputValues) => AdoptionApplicationCreateFormInputValues;
    onValidate?: AdoptionApplicationCreateFormValidationValues;
} & React.CSSProperties>;
export default function AdoptionApplicationCreateForm(props: AdoptionApplicationCreateFormProps): React.ReactElement;
