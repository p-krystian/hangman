<p align="center">
  <img src="src/Assets/Langs/en/logo.webp" alt="Hangman">
</p>

<p align="center">
  Hangman multiplayer game written in React with Vite.
</p>

## About
Code language: `EN`\
Interface language: `EN` and `PL`\
\
Hangman's game.\
You can play alone or with another people.\
Multiplayer allows to play on one device or two via the WebSocket server.
<!-- Socket.IO server code is not public. -->

## TODOs
- Better sounds effects
- Better UI and UX
- Performance improvements
- Expanding the words base
- Security fixes
- Eliminate bugs
- Accessibility improvements
- Keyboard navigation

## Running
In the project directory, you can run:

`npm install` - to install dependences\
`npm run dev` - to start a local development server\
`npm run build` - to build a production app\
`npm run preview` - to run Vite in preview mode

## Environment Variables
The project requires the following environment variables:

- `VITE_SOCKET_URL`: URL to the Socket.IO server
- `VITE_SOCKET_PATH`: Path that the Socket.IO server is listening on
- `VITE_EXIT_URL`: Redirect URL when window.close() is not available
- `VITE_DATA_URL`: URL to the CDN server (or to the public directory)
- `VITE_AUTHOR_URL`: URL to the author's page
- `VITE_STORAGE_PREFIX`: Prefix for values in LocalStorage

## Learn More
Official React website: [https://react.dev/](https://react.dev/)\
Official Vite website: [https://vitejs.dev/](https://vitejs.dev/)\
Official Socket.IO website: [https://socket.io/docs/v4/faq/](https://socket.io/docs/v4/faq/)\
Wikipedia article about Hangman: [https://en.wikipedia.org/wiki/Hangman_(game)](https://en.wikipedia.org/wiki/Hangman_(game))
