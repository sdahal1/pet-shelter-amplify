/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAdoptionApplication = /* GraphQL */ `
  query GetAdoptionApplication($applicationId: ID!) {
    getAdoptionApplication(applicationId: $applicationId) {
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
export const getPet = /* GraphQL */ `
  query GetPet($petId: ID!) {
    getPet(petId: $petId) {
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
export const listAdoptionApplications = /* GraphQL */ `
  query ListAdoptionApplications(
    $applicationId: ID
    $filter: ModelAdoptionApplicationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAdoptionApplications(
      applicationId: $applicationId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        applicantName
        applicationId
        createdAt
        email
        petId
        phone
        submittedAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listPets = /* GraphQL */ `
  query ListPets(
    $filter: ModelPetFilterInput
    $limit: Int
    $nextToken: String
    $petId: ID
    $sortDirection: ModelSortDirection
  ) {
    listPets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      petId: $petId
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
