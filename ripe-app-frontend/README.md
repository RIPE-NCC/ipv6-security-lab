How to compile HTML frontend
============================

 1. Install [Node.js](https://nodejs.org/)
 2. Setup internal components registry path in `~/.npmrc`
 3. Run `npm install`
 4. Run development server on port 4042 by running `npm run start`. It will
    proxy console access to `http://localhost:8080/`.
 5. Build a new version by running `npm run build`
