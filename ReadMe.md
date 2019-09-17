![WebCell logo](https://web-cell.dev/image/WebCell-0.png)

# WebCell

Light-weight **[Web Components](https://www.webcomponents.org/) framework** (with MVVM support) based on [ECMAScript 2018][1] & [Decorator proposal][2], powered by the practice & experience from developing [EWA v1.0 ~ 4.0](https://gitee.com/Tech_Query/EasyWebApp/).

[![NPM Dependency](https://david-dm.org/EasyWebApp/WebCell.svg)](https://david-dm.org/EasyWebApp/WebCell)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FEasyWebApp%2FWebCell.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FEasyWebApp%2FWebCell?ref=badge_shield)
[![Build Status](https://travis-ci.com/EasyWebApp/WebCell.svg?branch=master)](https://travis-ci.com/EasyWebApp/WebCell)
[![](https://data.jsdelivr.com/v1/package/npm/web-cell/badge?style=rounded)](https://www.jsdelivr.com/package/npm/web-cell)

[![NPM](https://nodei.co/npm/web-cell.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/web-cell/)

[![Anti 996 license](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
[![Join the chat at https://gitter.im/EasyWebApp-js/Lobby](https://badges.gitter.im/EasyWebApp-js/Lobby.svg)](https://gitter.im/EasyWebApp-js/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## Basic knowledge

 1. [Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

 2. [Custom elements](https://developers.google.com/web/fundamentals/web-components/customelements)

 3. [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom)

 4. [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)

 5. [ECMAScript 6+](http://es6-features.org/)

 6. [Decorator](https://github.com/tc39/proposal-decorators/tree/master/previous#decorators)



## Basic Usage


### Quick start

```Shell
npm init web-cell path/to/your_project \
    --remote https://git-example.com/your_id/repo_name.git

web-cell new your-tag attr1,attr2
```
(More configuration & template files can be found in the document of [WebCell DevCLI](https://web-cell.dev/DevCLI/))


### Component

Create [files as shown below](https://github.com/EasyWebApp/DevCLI/tree/master/test/example-js) in `path/to/your-component` directory:

#### `index.html`

[Template syntax of Data binding](https://web-cell.dev/DOM-Renderer/manual/Template.html)

```HTML
<template>
    <textarea onchange="${host.trigger.bind( host )}">
        Hello, ${view.name}!
    </textarea>
    <img src="${host.constructor.icon}">
    <table>
        <tbody data-view="specification"><template>
            <tr>
                <td></td><td>${view.name}</td>
            </tr>
        <template></tbody>
    </table>
    <slot></slot>
</template>
```

#### `index.css`

```CSS
textarea {
    font-style: italic;
}

tbody {
    counter-reset:  index;
}
tr > td:first-child::before {
    counter-increment:  index;
    content:            counter( index );
}
```

#### `index.json`

```JSON
{
    "name":           "Web components",
    "specification":  [
        {"name": "HTML 5.3"},
        {"name": "DOM 4.1"},
        {"name": "ECMAScript 2018"},
        {"name": "Decorator proposal"}
    ]
}
```

#### `icon.svg`

```XML
<svg></svg>
```

#### `index.js`

```JavaScript
import {
    component, blobURI, mapProperty, mapData, on, at, debounce
} from 'web-cell';

import template from './index.html';

import style from './index.css';

import data from './index.json';

import icon from './icon.svg';


@component({                 //  Register this class as a Custom Element,
    template, style, data    //  then define static properties
})
export default  class YourComponent extends HTMLElement {

    constructor() {

        super().construct();    //  This method is required,
                                //  it makes building Shadow DOM easier.
    }

    @blobURI    //  Convert Data URL to Object URL, then cache it
    static get icon() {  return icon;  }

    @mapProperty    //  Assign parsed value of Attribute to Property with the same name
    static get observedAttributes() {  return ['value', 'name'];  }

    @mapData    //  Assign Property value to Data with the same name
    attributeChangedCallback() { }

    /**
     * Do something after Outside nodes changing
     *
     * @param {Node[]}          assigned - Nodes pluged into a slot
     * @param {HTMLSlotElement} slot
     * @param {?String}         name     - `name` attribute of `slot`
     */
    slotChangedCallback(assigned, slot, name) { }

    /**
     * @param {Object} newData
     * @param {Object} oldData
     * @param {View}   view
     *
     * @return {?Boolean} `false` can prevent the view of this Component to rerender
     */
    viewUpdateCallback(newData, oldData, view) { }

    /**
     * @param {Object} data
     * @param {View}   view
     */
    viewChangedCallback(data, view) { }

    @on('input',  ':host textarea')
    @debounce()
    countLength(event, target) {

        console.log(`Input length: ${target.value.length}`);
    }

    @at(':host *')
    onAny(event, target) { }

    get value() {  return this.$('textarea')[0].value  }

    set value(raw) {  this.$('textarea')[0].value = raw;  }
}
```

and then preview them during development with:
```Shell
web-cell preview
```

### Bundle

Bundle components to a package with JS modules in it:
```Shell
web-cell pack
```


## Documentation

 - [API](https://web-cell.dev/WebCell/): `npm docs` or `npm start`

 - [Guide](https://web-cell.dev/WebCell/manual/): `npm start manual`



## Component library

 1. [cell-common](https://web-cell.dev/cell-common/) Common components

 2. [cell-router](https://web-cell.dev/cell-router/)

 3. [Material Cell](https://web-cell-ht.ml/) based on **Material Design lite v1.3**

 4. [GitHub Web widget](https://tech-query.me/GitHub-Web-Widget/) forked from [GitHub jQuery Repo widget](https://github.com/JoelSutherland/GitHub-jQuery-Repo-Widget)

 5. [Month picker](https://tech-query.me/month-picker/)



## Standard specification

 1. [HTML 5.3](https://www.w3.org/TR/html53/)

 2. [DOM 4.1](https://www.w3.org/TR/dom41/)

 3. [CSS variables](https://www.w3.org/TR/css-variables-1/)

 4. [ECMAScript 2018][1]

 5. [Decorator proposal][2]



[1]: https://www.ecma-international.org/publications/standards/Ecma-262.htm

[2]: https://github.com/tc39/proposal-decorators/tree/master/previous#readme



## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FEasyWebApp%2FWebCell.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FEasyWebApp%2FWebCell?ref=badge_large)


<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
    <img alt="Creative Commons License" style="border-width:0"
         src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" />
</a>

<span xmlns:dct="http://purl.org/dc/terms/" property="dct:title" rel="dct:type"
      href="http://purl.org/dc/dcmitype/StillImage">
    WebCell logo
</span>
by
<a xmlns:cc="http://creativecommons.org/ns#"
   property="cc:attributionName" rel="cc:attributionURL"
   href="https://web-cell.dev/">
   Shi Yao  &  Xie JiaQi
</a>
is licensed under a
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
   Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
</a>.

Based on a work at
<a xmlns:dct="http://purl.org/dc/terms/" rel="dct:source"
   href="https://web-cell.dev/WebCell/">
    https://web-cell.dev/WebCell/
</a>.
