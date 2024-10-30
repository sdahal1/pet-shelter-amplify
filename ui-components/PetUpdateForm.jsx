/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getPet } from "./graphql/queries";
import { updatePet } from "./graphql/mutations";
const client = generateClient();
export default function PetUpdateForm(props) {
  const {
    petId: petIdProp,
    pet: petModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    petId: "",
    name: "",
    age: "",
    species: "",
    dateEntered: "",
    image: "",
  };
  const [petId, setPetId] = React.useState(initialValues.petId);
  const [name, setName] = React.useState(initialValues.name);
  const [age, setAge] = React.useState(initialValues.age);
  const [species, setSpecies] = React.useState(initialValues.species);
  const [dateEntered, setDateEntered] = React.useState(
    initialValues.dateEntered
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = petRecord
      ? { ...initialValues, ...petRecord }
      : initialValues;
    setPetId(cleanValues.petId);
    setName(cleanValues.name);
    setAge(cleanValues.age);
    setSpecies(cleanValues.species);
    setDateEntered(cleanValues.dateEntered);
    setImage(cleanValues.image);
    setErrors({});
  };
  const [petRecord, setPetRecord] = React.useState(petModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = petIdProp
        ? (
            await client.graphql({
              query: getPet.replaceAll("__typename", ""),
              variables: { petId: petIdProp },
            })
          )?.data?.getPet
        : petModelProp;
      setPetRecord(record);
    };
    queryData();
  }, [petIdProp, petModelProp]);
  React.useEffect(resetStateValues, [petRecord]);
  const validations = {
    petId: [{ type: "Required" }],
    name: [],
    age: [],
    species: [],
    dateEntered: [],
    image: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          petId,
          name: name ?? null,
          age: age ?? null,
          species: species ?? null,
          dateEntered: dateEntered ?? null,
          image: image ?? null,
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
            query: updatePet.replaceAll("__typename", ""),
            variables: {
              input: {
                petId: petRecord.petId,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PetUpdateForm")}
      {...rest}
    >
      <TextField
        label="Pet id"
        isRequired={true}
        isReadOnly={true}
        value={petId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              petId: value,
              name,
              age,
              species,
              dateEntered,
              image,
            };
            const result = onChange(modelFields);
            value = result?.petId ?? value;
          }
          if (errors.petId?.hasError) {
            runValidationTasks("petId", value);
          }
          setPetId(value);
        }}
        onBlur={() => runValidationTasks("petId", petId)}
        errorMessage={errors.petId?.errorMessage}
        hasError={errors.petId?.hasError}
        {...getOverrideProps(overrides, "petId")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              petId,
              name: value,
              age,
              species,
              dateEntered,
              image,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Age"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={age}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              petId,
              name,
              age: value,
              species,
              dateEntered,
              image,
            };
            const result = onChange(modelFields);
            value = result?.age ?? value;
          }
          if (errors.age?.hasError) {
            runValidationTasks("age", value);
          }
          setAge(value);
        }}
        onBlur={() => runValidationTasks("age", age)}
        errorMessage={errors.age?.errorMessage}
        hasError={errors.age?.hasError}
        {...getOverrideProps(overrides, "age")}
      ></TextField>
      <SelectField
        label="Species"
        placeholder="Please select an option"
        isDisabled={false}
        value={species}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              petId,
              name,
              age,
              species: value,
              dateEntered,
              image,
            };
            const result = onChange(modelFields);
            value = result?.species ?? value;
          }
          if (errors.species?.hasError) {
            runValidationTasks("species", value);
          }
          setSpecies(value);
        }}
        onBlur={() => runValidationTasks("species", species)}
        errorMessage={errors.species?.errorMessage}
        hasError={errors.species?.hasError}
        {...getOverrideProps(overrides, "species")}
      >
        <option
          children="Cat"
          value="Cat"
          {...getOverrideProps(overrides, "speciesoption0")}
        ></option>
        <option
          children="Dog"
          value="Dog"
          {...getOverrideProps(overrides, "speciesoption1")}
        ></option>
        <option
          children="Reptile"
          value="Reptile"
          {...getOverrideProps(overrides, "speciesoption2")}
        ></option>
        <option
          children="Fish"
          value="Fish"
          {...getOverrideProps(overrides, "speciesoption3")}
        ></option>
        <option
          children="Bird"
          value="Bird"
          {...getOverrideProps(overrides, "speciesoption4")}
        ></option>
        <option
          children="Rodent"
          value="Rodent"
          {...getOverrideProps(overrides, "speciesoption5")}
        ></option>
      </SelectField>
      <TextField
        label="Date entered"
        isRequired={false}
        isReadOnly={false}
        value={dateEntered}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              petId,
              name,
              age,
              species,
              dateEntered: value,
              image,
            };
            const result = onChange(modelFields);
            value = result?.dateEntered ?? value;
          }
          if (errors.dateEntered?.hasError) {
            runValidationTasks("dateEntered", value);
          }
          setDateEntered(value);
        }}
        onBlur={() => runValidationTasks("dateEntered", dateEntered)}
        errorMessage={errors.dateEntered?.errorMessage}
        hasError={errors.dateEntered?.hasError}
        {...getOverrideProps(overrides, "dateEntered")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              petId,
              name,
              age,
              species,
              dateEntered,
              image: value,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(petIdProp || petModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(petIdProp || petModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
