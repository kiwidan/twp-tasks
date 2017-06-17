# Teamwork Project Tasks Demo

I have recently decided to learn a bit of React (it is awesome). I have also recently started using Teamwork Project (it is also awesome). So I thought I would explore the Teamwork Project API and do so with a bit of React.

At the moment all this app does is retrieve tasklists and tasks from Teamwork Project and allow you to check/uncheck tasks.

NOTE: this is a very old version of react (0.13.1), but it's not really that different from the current version (as of July '16).

![alt tag](https://raw.githubusercontent.com/paddymoran/twp-tasks/master/docs/twp-tasks.png)

# Setup

1. Clone the repo
2. Install dependencies `npm install`
3. Compile the JSX and ES6 `gulp browserify`
4. Setup the env.js file:
    1. Copy `env.example.js` to `env.js` (in the root directory)
    2. Fill in the blanks (company, key, and projectId)
