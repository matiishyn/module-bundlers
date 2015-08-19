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