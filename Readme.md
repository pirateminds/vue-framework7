# Vue + Webpack + Framework7 mobile

## Get Started Fast

`npm install -g cordova`
`npm install`

More about cordova you can read here [Cordova Docs](https://cordova.apache.org/#getstarted)

## Run

To run app in browser without any cordova bullshit just type:

`npm run start`

When you need to play with cordowa specific code, use:

`npm run browser`
`npm run ios`
`npm run android`

## Test

Some times you needs to write complex bulshit logic, hard understand and use. Please write a test to be able work with it in the future.

To test app there

`npm run test`

It use jest at the behind, so fill free to do any strange tests you want. But remember. [Jest Docs](https://facebook.github.io/jest/) are here. 

To run specific code tests use

`npm run test ./src/folder`

## i18n - internationalization

to load localization from google docs to the app use

`npm run locales`

## Other Tasks

`npm run cleanup-perms` - used to disable unstable features before production release.

-----
MIT Pirateminds.com
