/* eslint-disable */
// "use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  Label,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { uploadData } from 'aws-amplify/storage';
import { createPet } from "./graphql/mutations";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient({
  authMode: 'userPool'
});
export default function PetCreateForm(props) {
  const navigate = useNavigate();
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
    name: "",
    age: "",
    species: "",
    dateEntered: "",
    image: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [age, setAge] = React.useState(initialValues.age);
  const [species, setSpecies] = React.useState(initialValues.species);
  const [dateEntered, setDateEntered] = React.useState(
    initialValues.dateEntered
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [file, setFile] = React.useState();
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setAge(initialValues.age);
    setSpecies(initialValues.species);
    setDateEntered(initialValues.dateEntered);
    setImage(initialValues.image);
    setErrors({});
  };
  const validations = {
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
      // Form submit handler
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          petId: uuidv4(),
          name,
          age,
          species,
          dateEntered,
          image,
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
          const { data, error } = await client.graphql({
            query: createPet.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (data) {
            console.log(data);
            console.log("Pet added");
            navigate("/pets");
          }
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
      {...getOverrideProps(overrides, "PetCreateForm")}
      {...rest}
    >
      <h2>Add a pet to shelter</h2>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
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
        min={0}
        step="any"
        value={age}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
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
        type="date"
        isRequired={false}
        isReadOnly={false}
        value={dateEntered}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
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
      {/* Amplify UI FileUploader component: https://ui.docs.amplify.aws/react/connected-components/storage/fileuploader  */}
      <Label htmlFor="image">Image</Label>
      <FileUploader
        id="image"
        acceptedFileTypes={['image/*']}
        path="public/images/"
        maxFileCount={1}
        maxFileSize={500000}
        isResumable
        onUploadSuccess={({ key }) => {
          // console.log('success', key)
          setImage(key);
        }}
      />
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
