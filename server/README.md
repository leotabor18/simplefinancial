## Migration

-

## Application

-

## Routing

-

export $(cat .env | tr -d ' ' | grep -v "#" | xargs)

# ENV

```
KINDE_ISSUER_URL=https://sftest.kinde.com
KINDE_CLIENT_ID=c1917f5b814a4d8ab136cc92d452c8a0
KINDE_CLIENT_SECRET=gP2gjhofvBbU4YndMv4MuVB5sV74RLhv2rCLoN7xrviLaGGI3fm
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
# Management
KINDE_DOMAIN=https://sftest.kinde.com
KINDE_MANAGEMENT_CLIENT_ID=9cfc5061163a48cb8e8cdaecb3666c26
KINDE_MANAGEMENT_CLIENT_SECRET=UnBqklX26kXUtbqtegUuscvPVRBE9b2SxQczf9xGaPTi8H0ZjW
```

Additional Kinde Configuration

- Add Properties
  - Name: Company
    - Key: cstm_usr_company
  - Name: Phone Number
    - Key: cstm_usr_phone_number
  - Name: Country
    - Key: cstm_usr_country
  - Name: Status
    - Key: cstm_usr_status
