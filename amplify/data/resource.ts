import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Pet: a.model({
    petId: a.id().required(),
    name: a.string(),
    age: a.integer(),
    species: a.enum(['Cat', 'Dog', 'Reptile', 'Fish', 'Bird', 'Rodent']),
    dateEntered: a.string(),
    image: a.string(),
    applications: a.hasMany('AdoptionApplication', 'petId')
  })
    .identifier(['petId']) // Define custom PK 
    .authorization(allow => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]), 
      allow.authenticated().to(["create", "read"]),
    ]),
  AdoptionApplication: a.model({
    applicationId: a.id().required(),
    applicantName: a.string(),
    email: a.email(),
    phone: a.string(),
    submittedAt: a.datetime(),
    petId: a.id().required(),
    pet: a.belongsTo('Pet', 'petId')
  })
    .identifier(['applicationId']) // Define custom PK
    .authorization((allow) => [
      allow.guest().to(["create"]), // Allow unauthenticated users to create
      allow.authenticated().to(["read"]), // Allow authenticated users to read
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema
});