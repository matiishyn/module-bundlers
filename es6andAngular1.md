Resources:
- http://blog.thoughtram.io/angularjs/es6/2015/01/23/exploring-angular-1.3-using-es6.html

## Angular and ES6 modules

```js
class MainController {

    constructor(searchService) {
    	// DI goes here
        this.searchService = searchService;
    }

    search () {
        this.searchService
            .fetch(this.searchTerm)
            .then(response => {
                this.items = response.data.items;
            });
    }
}
export { MainController }
```

```js
import { MainController } from './path/to/MainController';
```

## Angular and ES6 inheritance

```js
class PageController {

    constructor(title) {
        this._title = title;
    }

    title () {
        return 'Title: ' + this._title;
    }
}
export { PageController }
```

```js
import { PageController } from './PageController';

class ProductPageController extends PageController {

    constructor() {
        super('ES6 inheritance with Angular');
    }
}

export { ProductPageController }
```

## dependency annotations
### `$inject`
In order to preserve dependency annotations for minification, we need to use the $inject property notation now:

```js
MainController.$inject = ['SearchService'];
```