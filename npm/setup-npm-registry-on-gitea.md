# Setup npm Registry on Gitea

## Get an access token for your account from Gitea

Got to `Settings > Applications > Manage Access Tokens > Generate New Token` and select the desired accesses. Then temporarily save this token.

## Create a `.npmrc` file

Create a `.npmrc` file in the same directory in which your Git Repository is present of your package.

Insert the following two lines into this file. Replace `YOUR_ACCESS_TOKEN` with the access token you obtained in the previous step.

```bash
@helloworld:registry=https://your-gitea-instance.com/api/packages/{owner}/npm/
//your-gitea-instance.com/api/packages/{owner}/npm/:_authToken=YOUR_ACCESS_TOKEN
```

## Publish the Registry to your Gitea instance

Make sure the name in your `package.json` file matches the registry name:

```json
{
  "name": "@helloworld/common",
  "version": "1.0.0"
  // other properties
}
```

Publish new version of the registry:

```bash
npm publish --registry https://your-gitea-instance.com/api/packages/{owner}/npm/
```
