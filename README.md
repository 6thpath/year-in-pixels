# Year In Pixels ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)

> A “Year In Pixels” is a colorful way to track the year’s moods, habits, or anything else.
> It’s also very efficient, fitting all days of the year into a single page. Once you get all the squares filled in, it looks pretty and you can gain some insights into your moods. - [Wellella](https://wellella.com/bullet-journal-year-in-pixels/#:~:text=A%20%E2%80%9CYear%20In%20Pixels%E2%80%9D%20is,some%20insights%20into%20your%20moods.)

This is an educational project. The whole idea came from a single [image](https://www.pinterest.com/pin/284782376423901844/) I found on [Pinterest](https://www.pinterest.com/) 3 years ago.

## Demo

https://year-in-pixels-af189.web.app/

## Development

- Clone project: `git clone https://github.com/lPaths/year-in-pixels.git`

## Requirements and Configuration

You’ll need to have Node 8.16.0 or Node 10.16.0 or later version on your local development machine.

There're 3 steps:

- [Create a Firebase project](https://firebase.google.com/docs/web/setup?gclid=EAIaIQobChMI7cnV_-n-6QIVxxwrCh3NmwnyEAAYASABEgJ0yvD_BwE#create-firebase-project)
- [Register your app with Firebase](https://firebase.google.com/docs/web/setup?gclid=EAIaIQobChMI7cnV_-n-6QIVxxwrCh3NmwnyEAAYASABEgJ0yvD_BwE#register-app)
- [Firebase config object](https://firebase.google.com/docs/web/setup?gclid=EAIaIQobChMI7cnV_-n-6QIVxxwrCh3NmwnyEAAYASABEgJ0yvD_BwE#config-object)

### Replacing Firebase config object

- Create file `config.ts` in `src/utils/`
- Export config. E.g.

```js
const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
}
```

### Enable Firebase authentication methods

You'll need to enable these 3 methods on firebase authen.

- [Email/Password Sign-in](https://firebase.google.com/docs/auth/web/password-auth#before_you_begin)
- [Google Sign-In](https://firebase.google.com/docs/auth/web/google-signin#before_you_begin)
- [Facebook Login](https://firebase.google.com/docs/auth/web/facebook-login#before_you_begin)

### Firestore rules

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow only authenticated content owners access
    match /pixels/{userId} {
      allow write: if request.auth.uid == userId
      allow read: if request.auth.uid == userId || (request.auth.uid in resource.data.shareWith)
    }
  }
}
```

### Start development server

And start the application with `npm start` or `yarn start` that will run the app in development mode.
Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.

The page will automatically reload if you make changes to the code.

## Deployment

This project use Firebase hosting for deployment. You can refer Firebase's docs if you want to deploy your own

[Firebase Hosting](https://firebase.google.com/docs/web/setup?gclid=EAIaIQobChMI7cnV_-n-6QIVxxwrCh3NmwnyEAAYASABEgJ0yvD_BwE#install-cli-deploy)

## Contributing

Please read our [CONTRIBUTING.md](https://github.com/lPaths/year-in-pixels/blob/master/CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

[MIT License](https://github.com/lPaths/year-in-pixels/blob/master/LICENSE.md) Copyright (c) 2020 Phat Mai
