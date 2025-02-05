# Agile Fetch 🚀  
A lightweight, powerful fetch wrapper with auto-retry, timeout, and better error handling.

## Installation  
```sh
npm install agile-fetch
```

## Usage
```js
import AgileFetch from 'agile-fetch';

const fetcher = new AgileFetch({ retries: 3, timeout: 5000 });

fetcher.fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

## Features
✅ Auto-retry failed requests  
✅ Timeout support  
✅ Lightweight & fast  
✅ Works in Node.js and browser  

## API

### `new AgileFetch(options)`

Creates a new instance of AgileFetch.

| Option   | Type   | Default | Description                               |
|----------|--------|---------|-------------------------------------------|
| retries  | number | 3       | Number of retry attempts for failed requests |
| timeout  | number | 5000    | Timeout in milliseconds                   |
| backoffFactor | number | 200 | Backoff factor in milliseconds between retries |

### `fetchWithRetry(url, options)`

Fetches a URL with retry and timeout support.

| Parameter | Type   | Description          |
|-----------|--------|----------------------|
| url       | string | The URL to fetch     |
| options   | object | Optional fetch request options |

## Installation for Development

If you want to contribute or modify the package, clone the repository:

```sh
git clone https://github.com/rizkyngrh23/agile-fetch.git
cd agile-fetch
npm install
```

## Running Tests

This package includes test cases to ensure functionality. Run tests with:

```sh
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

This version includes:  
✅ Detailed API documentation  
✅ Installation & usage examples  
✅ Testing instructions  
✅ Contributing section  

You can copy this into your README.md file on GitHub. Let me know if you need more changes! 🚀

