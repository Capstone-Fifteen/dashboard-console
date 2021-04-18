# dashboard-console
This repository contains the source code for dashboard's frontend system. The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements
The project is contingent on the backend system to work properly. Before starting this project, ensure that
the [backend system](https://github.com/Capstone-Fifteen/dashboard-backend/tree/submission) has been set up.

The project also requires the following dependencies:
1. [NodeJS v14.16](https://nodejs.org/en/)
2. [Yarn](https://yarnpkg.com/)

## Steps
1. Start the backend system
2. In the '.env' file, put in the GraphQL secret
3. Run `yarn install` to fetch required React dependencies
4. Run `yarn start` to start the app.
5. Launch the app on your browser at http://localhost:3000 
6. The admin secret of the app is the same as the GraphQL's admin secret.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Code Directory
This section explains the file structure of the codebase in `src` directory. The entry point of the app is `index.tsx` in
the `src` directory. 

|Directory     |Purpose                        
|--------|------
|component|Components in this folder are reusable components i.e. components that are used multiple times in the codebase.
|constant|Nothing much to say here. Just your standard constants directory with all things related to constants.
|container|These are components that essentially form the entirety of a screen and are non-reusable. In other words, each container is 1 screen on the app.
|graphql|Graphql configurations, query, mutation and subscription graphql strings reside in this folder.
|redux|Redux store configuration, actions and reducers reside in this folder. 
|utils|Helper functions and business logics that declutters the view code and are reusable go into this folder. 

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
