import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'petShelterApplication',
  access: (allow) => ({
    'public/images/*': [
        allow.guest.to(['read']),
        allow.authenticated.to(['read', 'write'])
    ]
  })
});
