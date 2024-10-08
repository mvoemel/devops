# Setup npm Registry on Gitea

This guide will explain how to create a private registry on Gitea in your private organization.

## Publishing a Registry

### Get an access token for your account from Gitea

Go to `Settings > Applications > Manage Access Tokens > Generate New Token` and select the desired accesses. Then temporarily save this token.

### Create a `.npmrc` file

Create a `.npmrc` file in the same directory in which your Git Repository is present of your package.

Insert the following three lines into this file. Replace `YOUR_ACCESS_TOKEN` with the access token you obtained in the previous step. Replace `your-gitea-instance.com` with your Gitea instance domain address. And replace `helloworld` with your package name.

```bash
@helloworld:registry=https://your-gitea-instance.com/api/packages/{owner}/npm/
//your-gitea-instance.com/api/packages/{organization}/npm/:_authToken=YOUR_ACCESS_TOKEN
//your-gitea-instance.com/api/packages/npm/:_authToken=YOUR_ACCESS_TOKEN
```

_Instead of using organization you can use the owner if you want to publish the registry based on a user account and not an organization_

### Publish the Registry to your Gitea instance

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
npm publish --registry https://your-gitea-instance.com/api/packages/{organization}/npm/
```

For convenience it is recommended to create a script in the `package.json` file.

```bash
"pub": "npm publish --registry https://your-gitea-instance.com/api/packages/{organization}/npm/"
```

## Installation

To install your published package first add the following file `.npmrc` to your project.

```bash
@helloworld:registry=https://your-gitea-instance.com/api/packages/{organization}/npm/
//your-gitea-instance.com/api/packages/{organization}/npm/:_authToken=YOUR_ACCESS_TOKEN
//your-gitea-instance.com/api/packages/npm/:_authToken=YOUR_ACCESS_TOKEN
```

_If the published package is public you do not need to add the last two lines with the access tokens_

Then you can install it in your project using the following command:

```bash
npm install @helloworld/common@1.0.0
```

or add it in your `package.json` file:

```bash
"@helloworld/common": "1.0.0"
```
