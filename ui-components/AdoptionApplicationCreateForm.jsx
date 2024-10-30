/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createAdoptionApplication } from "./graphql/mutations";
const client = generateClient();
export default function AdoptionApplicationCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    applicationId: "",
    applicantName: "",
    email: "",
    phone: "",
    submittedAt: "",
  };
  const [applicationId, setApplicationId] = React.useState(
    initialValues.applicationId
  );
  const [applicantName, setApplicantName] = React.useState(
    initialValues.applicantName
  );
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [submittedAt, setSubmittedAt] = React.useState(
    initialValues.submittedAt
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setApplicationId(initialValues.applicationId);
    setApplicantName(initialValues.applicantName);
    setEmail(initialValues.email);
    setPhone(initialValues.phone);
    setSubmittedAt(initialValues.submittedAt);
    setErrors({});
  };
  const validations = {
    applicationId: [{ type: "Required" }],
    applicantName: [],
    email: [{ type: "Email" }],
    phone: [],
    submittedAt: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          applicationId,
          applicantName,
          email,
          phone,
          submittedAt,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createAdoptionApplication.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "AdoptionApplicationCreateForm")}
      {...rest}
    >
      <TextField
        label="Application id"
        isRequired={true}
        isReadOnly={false}
        value={applicationId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationId: value,
              applicantName,
              email,
              phone,
              submittedAt,
            };
            const result = onChange(modelFields);
            value = result?.applicationId ?? value;
          }
          if (errors.applicationId?.hasError) {
            runValidationTasks("applicationId", value);
          }
          setApplicationId(value);
        }}
        onBlur={() => runValidationTasks("applicationId", applicationId)}
        errorMessage={errors.applicationId?.errorMessage}
        hasError={errors.applicationId?.hasError}
        {...getOverrideProps(overrides, "applicationId")}
      ></TextField>
      <TextField
        label="Applicant name"
        isRequired={false}
        isReadOnly={false}
        value={applicantName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationId,
              applicantName: value,
              email,
              phone,
              submittedAt,
            };
            const result = onChange(modelFields);
            value = result?.applicantName ?? value;
          }
          if (errors.applicantName?.hasError) {
            runValidationTasks("applicantName", value);
          }
          setApplicantName(value);
        }}
        onBlur={() => runValidationTasks("applicantName", applicantName)}
        errorMessage={errors.applicantName?.errorMessage}
        hasError={errors.applicantName?.hasError}
        {...getOverrideProps(overrides, "applicantName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationId,
              applicantName,
              email: value,
              phone,
              submittedAt,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationId,
              applicantName,
              email,
              phone: value,
              submittedAt,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Submitted at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={submittedAt && convertToLocal(new Date(submittedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              applicationId,
              applicantName,
              email,
              phone,
              submittedAt: value,
            };
            const result = onChange(modelFields);
            value = result?.submittedAt ?? value;
          }
          if (errors.submittedAt?.hasError) {
            runValidationTasks("submittedAt", value);
          }
          setSubmittedAt(value);
        }}
        onBlur={() => runValidationTasks("submittedAt", submittedAt)}
        errorMessage={errors.submittedAt?.errorMessage}
        hasError={errors.submittedAt?.hasError}
        {...getOverrideProps(overrides, "submittedAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
