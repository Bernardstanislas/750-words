# Welcome!

If you're reading this, you might be interested in contributing to the development of the project. Thank you for your interest!

This document aims at providing you with the necessary information to get started with the project.

## Tech stack

We are using [SvelteKit](https://kit.svelte.dev/) as the main framework for the project. This enables us to have a server-side rendered app that is also a progressive web app.

The app is deployed on [Vercel](https://vercel.com/).

## Data encryption

User input is encrypted using [RSA-OAEP](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#rsa-oaep) with a 4096-bit key. The key is stored in the browser's local storage and is never sent to the server.

The only data sent to the server is the encrypted text and the date of the entry. The server does not have access to the key.

Whenever the user wants to access their data, the app decrypts the data using the key stored in the local storage.

If the user wants to access their data on another device, they can scan a QR code that contains the encrypted key. The app will then decrypt the data fetched from the server using the key contained in the QR code, and store it locally.

## Roadmap

The project is still in its early stages. The following features are planned:

- [x] Save user data in the local storage
- [ ] Generate a unique key pair for the user, and store it in the local storage
- [ ] Encrypt user input using the user's key pair
- [ ] Send the encrypted data to the server
- [ ] Generate a QR code exposing the user's key pair
- [ ] Allow the user to scan a QR code containing a key pair
