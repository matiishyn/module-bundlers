jspm is a package manager for the SystemJS universal module loader, built on top of the dynamic ES6 module loader

## Resources:
- http://jspm.io/
- https://github.com/jspm/jspm-cli/wiki/Getting-Started

# 1. Getting Started
## Install JSPM
```js
npm i jspm --save-dev -g
jspm -v
jspm init
```
## Install any packages from the jspm Registry, GitHub or npm
```
jspm install npm:lodash-node
jspm install github:components/jquery
jspm install jquery
jspm install myname=npm:underscore
```
## Application
`lib/bootstrap.js`
```js
import _ from 'lodash-node/modern/lang/isEqual';
import $ from 'jquery';
import underscore from 'myname';

export function bootstrap() {
  // bootstrap code here
}
```
`lib/main.js`
```js
import {bootstrap} from './bootstrap';
bootstrap();
```    
`index.html`
```html
<!doctype html>
<script src="jspm_packages/system.js"></script>
<script src="config.js"></script>
<script>
	System.import('lib/main');
</script>
```  