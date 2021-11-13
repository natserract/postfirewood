# Redwood

**Redwood is an opinionated, full-stack, serverless-ready web application framework
that will allow you to build and deploy with ease.**
Imagine a React frontend, statically delivered by CDN, that talks via GraphQL to
your backend running on AWS Lambdas (or containers) around the world, all deployable with just a
`git push`—that's Redwood. By making a lot of decisions for you, Redwood lets
you get to work on what makes your application special, instead of wasting
cycles choosing and re-choosing various technologies and configurations. Plus,
because Redwood is a proper framework, you benefit from continued performance
and feature upgrades over time and with minimum effort.

> **NOTICE:** RedwoodJS is very close to a stable version 1.0. In the last two years,
> the project has matured significantly and is already used in production by a number
> of startups. We intend to have a 1.0 release candidate before the end of 2021 and
> to release a truly production-ready 1.0 in early 2022.

## Getting Started
- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn redwood dev
```

### Storybook

```terminal
yarn rw storybook
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.

## Addition Features
The goal is to have the following:
- Authentication and Sign Up using firebase
- Token encryption for authentication
- Observable token
- Custom Private Routes
- Rest API Axios support
- Save data on PostgreSQL Database
- HTML5 History/State APIs
- Material UI Components Integration


## Issues
- [https://github.com/redwoodjs/redwood/issues/1595](https://github.com/redwoodjs/redwood/issues/1595)
- [https://github.com/facebook/react/issues/17280#issuecomment-549980239](https://github.com/facebook/react/issues/17280#issuecomment-549980239)
- Invalid attempt to destructure non-iterable instance
