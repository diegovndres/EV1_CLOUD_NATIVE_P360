export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'ac0cd280-33b6-4d33-ae42-aa056c7029fa',
      authority: 'https://login.microsoftonline.com/14c021dd-6b1d-423e-a9f9-e59b17394821',
      redirectUri: 'http://localhost:4200/'
    }
  },
  apiConfig: {
    scopes: ['api://ac0cd280-33b6-4d33-ae42-aa056c7029fa/access_as_user'],
    uri: 'http://localhost:8081'
  }
};