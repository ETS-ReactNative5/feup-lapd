# Instructions

## Server

To run the server there needs to be an .env file with the API keys. A template can be found in `.env.template`.

```
> cd server

> npm install

> npm start
```

## App

To run the React Native application we use Expo Cli. With this platform it is possible to run the application both in Android and iOS  on an emulator or in your mobile phone if the Expo app is installed. If you want to use your mobile phone make sure you expose the server in your network and change the API_URL variable in `app/api/ApiServices.js`.

```
> cd app

> npm install

> npm start
```

After this commands an Expo web application will appear on the browser and you can choose where you want to run the application.
