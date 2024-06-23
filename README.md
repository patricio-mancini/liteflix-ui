# Liteflix - User Interface

## Implementation Details

This is an Single Page Application built on `Next.js` v14, leveraging a hybrid rendering strategy that integrates `server components` for `server actions` and `client components` for utilizing browser and `React` APIs on the client side.

## Tech Stack

- `Next.js` - v14 using the App router for hybrid server-side rendering and client-side rendering.
- `React` - v18 for building interactive user interfaces.
- `TypeScript` - for type safety and improved developer experience.
- `Emotion` - as a CSS-in-JS library for styling components.
- `react-device-detect` - for responsive design based on the user's device.
- `Google OAuth2` - for secure authentication and user management.

## Project Structure

The project structure is organized as follows:

- `./app`: Contains main layout and page that makes uses of the new Next.js routing system.
- `./components`: Reusable React components used across the app.
- `./lib`: Contains utility functions, API integrations, global styles and Authentication logic.
- `./types`: Common TypeScript types.
- `./public`: Static assets such as images and fonts.

## API Integration

Liteflix connects to two different APIs:

1. `Liteflix API`: A Node.js RESTful service that allows pushing a movie and retrieving a list of movies associated with the user. It also provides authentication endpoints that utilize Google OAuth2.
2. `themoviedb API`: Provides access to a colleciton of movies, offering detailed metadata and media assets.

## Deployment

The deployed version of Liteflix is hosted at [https://liteflix.patriciomancini.net](https://liteflix.patriciomancini.net).

Please note that to authenticate into the app through Liteflix, you need to add me to add your Google account to the list of test accounts. Otherwise, you won't be able to log in and test the authenticated functionality.

## Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in the development mode.

- `npm run build`: Builds the app for production deployment.

- `npm start`: Starts the production server after a successful build.

- `npm run lint`: Lints the codebase for coding standards and best practices.

- `npm test`: Runs tests related to the project using Jest.