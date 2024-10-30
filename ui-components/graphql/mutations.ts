/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAdoptionApplication = /* GraphQL */ `
  mutation CreateAdoptionApplication(
    $condition: ModelAdoptionApplicationConditionInput
    $input: CreateAdoptionApplicationInput!
  ) {
    createAdoptionApplication(condition: $condition, input: $input) {
      applicantName
      applicationId
      createdAt
      email
      pet {
        age
        createdAt
        dateEntered
        image
        name
        petId
        species
        updatedAt
        __typename
      }
      petId
      phone
      submittedAt
      updatedAt
      __typename
    }
  }
`;
export const createPet = /* GraphQL */ `
  mutation CreatePet(
    $condition: ModelPetConditionInput
    $input: CreatePetInput!
  ) {
    createPet(condition: $condition, input: $input) {
      age
      applications {
        nextToken
        __typename
      }
      createdAt
      dateEntered
      image
      name
      petId
      species
      updatedAt
      __typename
    }
  }
`;
export const deleteAdoptionApplication = /* GraphQL */ `
  mutation DeleteAdoptionApplication(
    $condition: ModelAdoptionApplicationConditionInput
    $input: DeleteAdoptionApplicationInput!
  ) {
    deleteAdoptionApplication(condition: $condition, input: $input) {
      applicantName
      applicationId
      createdAt
      email
      pet {
        age
        createdAt
        dateEntered
        image
        name
        petId
        species
        updatedAt
        __typename
      }
      petId
      phone
      submittedAt
      updatedAt
      __typename
    }
  }
`;
export const deletePet = /* GraphQL */ `
  mutation DeletePet(
    $condition: ModelPetConditionInput
    $input: DeletePetInput!
  ) {
    deletePet(condition: $condition, input: $input) {
      age
      applications {
        nextToken
        __typename
      }
      createdAt
      dateEntered
      image
      name
      petId
      species
      updatedAt
      __typename
    }
  }
`;
export const updateAdoptionApplication = /* GraphQL */ `
  mutation UpdateAdoptionApplication(
    $condition: ModelAdoptionApplicationConditionInput
    $input: UpdateAdoptionApplicationInput!
  ) {
    updateAdoptionApplication(condition: $condition, input: $input) {
      applicantName
      applicationId
      createdAt
      email
      pet {
        age
        createdAt
        dateEntered
        image
        name
        petId
        species
        updatedAt
        __typename
      }
      petId
      phone
      submittedAt
      updatedAt
      __typename
    }
  }
`;
export const updatePet = /* GraphQL */ `
  mutation UpdatePet(
    $condition: ModelPetConditionInput
    $input: UpdatePetInput!
  ) {
    updatePet(condition: $condition, input: $input) {
      age
      applications {
        nextToken
        __typename
      }
      createdAt
      dateEntered
      image
      name
      petId
      species
      updatedAt
      __typename
    }
  }
`;
