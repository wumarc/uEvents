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

## Deploy the website (web)

https://uevents-a9365.web.app/

- `firebase login` with your uEvents personal gmail account
- `npx expo export:web`
- `firebase deploy --only hosting`

## Deploy the app

TODO

## CLI package management tools

npx: 8.13.2
n: v9.2.0
npm: 8.13.2
node: v21.5.0
expo (CLI): 0.7.3

## Upgrade Expo

https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/

First remove node modules and package-lock.json
`npm install expo@latest`
`npx expo install --fix`
`npm i`

## Expo setup

Building with expo is complicated...

### Prebuild

I am 90% sure we use Expo prebuild https://docs.expo.dev/workflow/prebuild/#pitch

### Web

I recommend using `npx expo start` and then start he web server with `w`. This should always work.

### IOS

Some stuff on IOS doesn't work with expo. Ideally, we would like to stay compatible with expo and disable extra features when they are not available.

**List of features not supported by Expo**

- Analytics

You can also build the app natively using `npx expo run:ios`

IOS uses Cocapods. Go to the ios folder and run `pod install`

You can also use this sequence to kill and rebuild your pods:

```
rm -rf ~/Library/Caches/CocoaPods
rm -rf Pods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
pod deintegrate
pod setup
pod install
```

## Test events

I created test events so we can add events that will not show for users. In the database, they are in "events-test".
They also have a special marking in the admin account and have a special button to create then in the admin web form.
If you want to see them in your normal view, add your account in the testUsersEvents in the userConfig.tsx file.

## DB structure

`events` / `events-test`: Contains the list of all events

`versions` / `versions-test`: List of all versions of the app. Only updated by admin and read by others.

`users`: List of all users profiles. Organizers and students.

## Analytics

Firebase has some default dark magic analytics. It includes screen view, user engagement, os update, first open and session start. It looks like there is a lot of metadata associated with it since you can learn a lot about your users with it. I don't know if it only works for users that are signed up. I don't know if it also collects when we are developing the app. I think somehow they also measure how long people use the app.

See the individual events:
https://analytics.google.com/analytics/web/?authuser=1&hl=en#/p376543684/reports/explorer?params=_u..pageSize%3D25%26_u..nav%3Dmaui&r=top-events&ruid=top-events,life-cycle,engagement&collectionId=life-cycle

Firebase offers only a high level view of events. You can't dive in and see properties, or make custom queries or not even sure if you can do your own graphs. I exported the firebase analytics data to BigQuery using an integration. There, it should be easier to see the events in detail. Big query is updated once a day and then streamlined (wtv that means).

Analytics events are batched together and sent every hour so it is very annoying to test. It is possible to use what is called the debug view. It is possible to activate the debug view using a chrome extension and then view the events in the firebase debug view console.

The current implementation of analytics to log event doesn't work in the web. TODO: explore using expo-firebase/_ libraries instead of the firebase/_ libraries we currently use.s
