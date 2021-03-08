# electron-validation-tts

## Install

Make sure you have [Node.js](https://nodejs.org/en/) installed,
First, clone the repo via git and install dependencies

```
git clone https://github.com/CandraJengger/electron-validation-tts.git
cd electron-validation-tts
npm install
```

## Starting Development

Start the app in `development` environment:

```
npm run watch (to run webpack in development mode)
```

Open a new Terminal, and run the code on the terminal

```
npm start (to run electron)
```

## Package for Production

Build the app in `production` environment:

```
npm run build:wp (to run webpack in production mode)
```

Packaging for distribution for Linux or Windows (according to the operating system used)

```
npm run dist
```
The results of the distribution will be stored in the `packages` directory

## Note

If you are using Windows, you will need to change some code

- Dashboard.js
  `line 188`
  ```
  const dir = filePath.substring(0, filePath.lastIndexOf('/'));
  ```
  to
  ```
  const dir = filePath.substring(0, filePath.lastIndexOf('\'));
  ```
- main.js
  `line 110`
  ```
  const dir = path.substring(0, path.lastIndexOf('/'));
  ```
  to
  ```
  const dir = path.substring(0, path.lastIndexOf('\'));
  ```
  `line 137`
  ```
  const dir = path.substring(0, path.lastIndexOf('/'));
  ```
  to
  ```
  const dir = path.substring(0, path.lastIndexOf('\'));
  ```
