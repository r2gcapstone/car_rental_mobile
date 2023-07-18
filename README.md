# CAR RENTAL MOBILE

### Built with React native + firebase

## Prerequisite

`Node js: "v18.15.0^"`

## Installation

`yarn install`

## How to start

`yarn start`

## How to TEST

`yarn test`

# DOCUMENTATION

## Folder structure

```
car-rental/
├── assets/
│   ├── images/
│   ├── fonts/
├── components/
│   ├── MyComponent1.js
│   ├── MyComponent2.js
│   └── ...
├── screens/
│   ├── HomeScreen.js
│   ├── ProfileScreen.js
│   └── ...
├── navigation/
│   ├── AppNavigator.js
│   └── MainTabNavigator.js
├── config/
│   ├── Colors.js
│   ├── Fonts.js
│   └── ...
├── App.js
├── package.json
├── app.json
├── babel.config.js
├── .expo-shared/
│   └── ...
└── node_modules/
    └── ...

```

1. `Assets` - This folder contains subdirectories to store images, fonts, and other static assets used in your project.

2. `Components` - This folder is for reusable components that you create throughout your app.

3. `Screens` - This folder contains different screens of your app. Each screen is a React component that represents a distinct page or view.

4. `Navigation` - This folder handles the navigation logic for your app. You might use React Navigation or any other navigation library here.

5. `Config` -This folder is for storing config/constants used in your application, such as colors, fonts, API endpoints, etc.

6. `App.js` - The entry point of your Expo app. This is where you'll set up the root component and navigation.

7. `Package.json` - The standard npm package file that lists your app's dependencies and scripts.

8. `App.json` - The configuration file for your Expo app, where you can define the app's name, icon, splash screen, and other settings.

9. `Babel.config.js` - Configuration file for Babel, used to transpile your code.

10. `.expo-shared` - Internal folder used by Expo. You typically don't need to interact with it directly.

11. `Node_modules` - The folder where all the installed dependencies are stored (auto-generated when you run npm install).

12. `tests` - folder that contains components for unit testing using JEST framework.
