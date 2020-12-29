# SIMS - Server

## Set up

1. Rename `.env.copy` to `.env`
2. Change the values in `.env` to match your configuration. The values are pretty self explanatory.
   - The email client is specific to gmail.
   - Read about Overnight JWT values [here]('https://github.com/seanpmaxwell/overnight#overnight-jwt')
   - For the master username and password, these can be any combination of your choosing. They are used to initially seed the database.
3. Follow seeding instructions below.

### Seed Database

1. Create a database called `sims`
2. Make a **GET** request to `{{baseURL}}/api/setup` with [Basic auth]('https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme') headers. Use the master username and password combination that you set in your `.env` file. Read more on how to generate a basic auth header [here]('https://www.blitter.se/utils/basic-authentication-header-generator/'). If everything goes well, you should get back a status **200** response.

This can be done easily using cURL as follows

```bash
curl --location --request GET '{{baseURL}}/api/setup' \
--header 'Authorization: {{BASIC_AUTH_STRING}}'
```

> Don't forget to replace `{{baseURL}}` and `{{BASIC_AUTH_STRING}}`

### Create root admin

You can only do this once for the root admin. To create other admins, you can use the functionality on the client side.

Make a **POST** request to `{{baseURL}}/api/auth/register-admin` with the body

```json
{
    "email": "",
    "firstName": "",
    "lastName": "",
    "password": ""
}
```

This can be done easily using cURL as follows

```bash
curl --location --request POST '{{baseURL}}/api/auth/register-admin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "",
    "firstName": "",
    "lastName": "",
    "password": ""
}'
```

> Don't forget to replace `{{baseURL}}`

### Set up client

Replace the `baseUrl` value in `client/src/services/constants`

## Build and run

All scripts necessary to start, build and/or run the server are defined in the scripts block in `package.json`.
