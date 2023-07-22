# uEvents

## Tech Stacks and Project Structure Explained

For the front-end, we are utilizing [React Native](https://reactnative.dev/), a JavaScript library for building mobile applications. We are also using [React Native Elements](https://reactnativeelements.com/), a UI library that provides pre-built components, to facilitate the development process. In addition, we've opted to use [TypeScript](https://www.typescriptlang.org/), a superset of JavaScript that offers optional static typing and many other features, to enhance our programming language. In addition to the UI library we are using, [React Navigation](https://reactnavigation.org/) is an important library we will make use of to implement routing and navigation features.

On the backend, we have opted to use [Firebase](https://firebase.google.com/), a cloud-based platform that offers a range of features for

To guide our development process, we have adopted the atomic design principle. This methodology emphasizes breaking down the user interface into smaller, reusable components, which can be combined to create larger, more complex layouts. You can learn more about the atomic design pattern [here](https://xd.adobe.com/ideas/process/ui-design/atomic-design-principles-methodology-101/).

## Project Setup

1. Run `npm install` to install the required packages.
2. Install `Android Studio` and `Xcode` if you wish to run the app on a simulator. You do not need to install both of these development environments if you want to run your app on your own physical device.
3. If you wish to run the app on a simulator, run `open -a Simulator` first to open up the iPhone simulator. The Android simulator will open up itself.
4. Execute `npm expo start` to run the app and follow the instructions in the terminal.

## Firebase Setup

- Install Firebase by running `npm install firebase`
- Create a `types` folder in your `src` folder
- Create a file named `env.d.ts`
- Define your env variables as string:

```
declare module '@env' {
    export const API_KEY: "",
    export const AUTH_DOMAIN: "",
    export const PROJECT_ID: "",
    export const STORAGE_BUCKET: "",
    export const MESSAGING_SENDER_ID: "",
    export const APP_ID: ""
    export const MEASUREMENT_ID: ""
  }
```

- The configuration info can be found on Firebase > Project Settings > General > Your apps > SDK setup and configuration

## Deploy the website

- `firebase login` with your uEvents personal gmail account
- `npx expo export:web`
- `firebase deploy --only web`

## To Do

TODO Change the password for the admin account
TODO Improve security rules by using firebase auth in the GCP bucket api request
TODO Add time filter and sort the events by date
