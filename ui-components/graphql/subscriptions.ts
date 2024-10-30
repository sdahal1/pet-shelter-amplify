/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAdoptionApplication = /* GraphQL */ `
  subscription OnCreateAdoptionApplication(
    $filter: ModelSubscriptionAdoptionApplicationFilterInput
  ) {
    onCreateAdoptionApplication(filter: $filter) {
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
export const onCreatePet = /* GraphQL */ `
  subscription OnCreatePet($filter: ModelSubscriptionPetFilterInput) {
    onCreatePet(filter: $filter) {
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
export const onDeleteAdoptionApplication = /* GraphQL */ `
  subscription OnDeleteAdoptionApplication(
    $filter: ModelSubscriptionAdoptionApplicationFilterInput
  ) {
    onDeleteAdoptionApplication(filter: $filter) {
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
export const onDeletePet = /* GraphQL */ `
  subscription OnDeletePet($filter: ModelSubscriptionPetFilterInput) {
    onDeletePet(filter: $filter) {
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
export const onUpdateAdoptionApplication = /* GraphQL */ `
  subscription OnUpdateAdoptionApplication(
    $filter: ModelSubscriptionAdoptionApplicationFilterInput
  ) {
    onUpdateAdoptionApplication(filter: $filter) {
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
export const onUpdatePet = /* GraphQL */ `
  subscription OnUpdatePet($filter: ModelSubscriptionPetFilterInput) {
    onUpdatePet(filter: $filter) {
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
