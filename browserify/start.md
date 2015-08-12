https://www.youtube.com/watch?v=CTAa8IcQh1U
** Getting started with Browserify

1. Install Browserify useing npm
```
npm install browserify --save-dev -g
```
2. Build app.js and its all dependencies to bundle.js
```
browserify app.js -o bundle.js
```
3. Write code in app.js but include bundle.js to your html

*** Let's add jQuery
Browserify works great with `npm`

1. Install jQuery via npm
```
npm install jquery --save
```
2. Require jQuery module from your app.js
```javascript
var $ = require('jquery');
// now you may use $ as jQuery
```

*** watchify - build after every change
Install `watchify` and it will build `browserify` after every change
- install
```
npm install watchify --save-dev -g
```
- watch
```
watchify app.js -o bundle.js
```
