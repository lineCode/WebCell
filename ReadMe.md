![WebCell logo](https://web-cell.dev/WebCell-0.f1ffd28b.png)

# WebCell

[Web Components][1] engine based on [JSX][2] & [TypeScript][3]

[![NPM Dependency](https://david-dm.org/EasyWebApp/WebCell.svg)][4]
[![Build Status](https://travis-ci.com/EasyWebApp/WebCell.svg?branch=v2)][5]

[![Anti 996 license](https://img.shields.io/badge/license-Anti%20996-blue.svg)][6]
[![Slideshow](https://img.shields.io/badge/learn-Slideshow-blue)][7]
[![Gitter](https://badges.gitter.im/EasyWebApp/community.svg)][8]

[![Edit WebCell demo](https://codesandbox.io/static/img/play-codesandbox.svg)][9]

[![NPM](https://nodei.co/npm/web-cell.png?downloads=true&downloadRank=true&stars=true)][10]

## Usage

Demo & **GitHub template**: https://web-cell.dev/scaffold/

### Project bootstrap

Command

```shell
npm init -y
npm install web-cell
npm install parcel-bundler -D
```

`package.json`

```json
{
    "scripts": {
        "start": "parcel source/index.html --open",
        "build": "parcel build source/index.html --public-url"
    }
}
```

[`tsconfig.json`](https://github.com/EasyWebApp/WebCell/blob/v2/tsconfig.json)

`source/index.html`

```html
<script src="https://polyfill.io/v3/polyfill.min.js?flags=gated&features=Object.fromEntries%2CArray.prototype.flat"></script>
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.3/webcomponents-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.3/custom-elements-es5-adapter.js"></script>

<script src="source/SubTag.tsx"></script>
<script src="source/TestTag.tsx"></script>

<sub-tag></sub-tag>
<test-tag></test-tag>
```

### Simple component

`source/SubTag.tsx`

```jsx
import { createCell, component, mixin } from 'web-cell';

export function InlineTag({ defaultSlot }: any) {
    return <span>{defaultSlot}</span>;
}

@component({
    tagName: 'sub-tag',
    renderTarget: 'children'
})
export class SubTag extends mixin() {
    render() {
        return <InlineTag>test</InlineTag>;
    }
}
```

### Advanced component

`source/TestTag.tsx`

```jsx
import {
    createCell,
    component,
    mixin,
    attribute,
    watch,
    on,
    Fragment
} from 'web-cell';

import { SubTag } from './SubTag';

interface Props {
    title?: string;
}

interface State {
    status: string;
}

@component({
    tagName: 'test-tag',
    style: {
        '.title': {
            color: 'lightblue'
        },
        '.title.active': {
            color: 'lightpink'
        }
    }
})
export class TestTag extends mixin<Props, State>() {
    @attribute
    @watch
    title = 'Test';

    state = { status: '' };

    onClick = () => (this.title = 'Example');

    @on('click', ':host h1')
    onDelegate() {
        this.setState({ status: 'active' });
    }

    render({ title }: Props, { status }: State) {
        return (
            <Fragment>
                <h1 title={title} className={`title ${status}`}>
                    {title}
                    <img alt={title} onClick={this.onClick} />

                    <SubTag />
                </h1>
            </Fragment>
        );
    }
}
```

## Life Cycle hooks

1. [`connectedCallback`](https://web-cell.dev/WebCell/interfaces/webcellcomponent.html#connectedcallback)

2. [`disconnectedCallback`](https://web-cell.dev/WebCell/interfaces/webcellcomponent.html#disconnectedcallback)

3. [`attributeChangedCallback`](https://web-cell.dev/WebCell/interfaces/webcellcomponent.html#attributechangedcallback)

4. [`adoptedCallback`](https://web-cell.dev/WebCell/interfaces/webcellcomponent.html#adoptedcallback)

5. [`shouldUpdate`](https://web-cell.dev/WebCell/interfaces/webcellcomponent.html#shouldupdate)

6. [`updatedCallback`](https://web-cell.dev/WebCell/interfaces/webcellcomponent.html#updatedcallback)

## Scaffolds

1. [Basic](https://github.com/EasyWebApp/scaffold)

2. [DashBoard](https://github.com/EasyWebApp/DashBoard)

3. [Static site](https://github.com/EasyWebApp/mark-wiki)

## Ecosystem

We recommend these libraries to use with WebCell:

-   **State management**: [MobX][11] (also powered by **TypeScript** & **Decorator**)

-   **Router**: [Cell Router][12] (based on **MobX**)

-   **UI components**

    -   [BootCell][13] (based on **BootStrap v4**)
    -   [Material Cell][14] (based on **Material Design** & **BootStrap v4**)
    -   [GitHub Web Widget][15]

-   **HTTP request**: [KoAJAX][16] (based on **Koa**-like middlewares)

-   **Utility**: [Web utility][17] (Methods & Types)

-   **Event stream**: [Iterable Observer][18] (**Observable** proposal)

-   **MarkDown integration**: [MarkCell][19] (**MDX** implement)

## Roadmap

-   [x] (Template) [Document Fragment node][20]
-   [ ] Server-side Render

Go to [contribute][21]!

[1]: https://www.webcomponents.org/
[2]: https://facebook.github.io/jsx/
[3]: https://www.typescriptlang.org
[4]: https://david-dm.org/EasyWebApp/WebCell
[5]: https://travis-ci.com/EasyWebApp/WebCell
[6]: https://github.com/996icu/996.ICU/blob/master/LICENSE
[7]: https://tech-query.me/programming/web-components-practise/slide.html
[8]: https://gitter.im/EasyWebApp/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
[9]: https://codesandbox.io/s/webcell-demo-9gyll?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FClock.tsx&theme=dark
[10]: https://nodei.co/npm/web-cell/
[11]: https://github.com/EasyWebApp/WebCell/blob/v2/MobX
[12]: https://web-cell.dev/cell-router/
[13]: https://bootstrap.web-cell.dev/
[14]: https://web-cell.dev/material-cell/
[15]: https://tech-query.me/GitHub-Web-Widget/
[16]: https://web-cell.dev/KoAJAX/
[17]: https://web-cell.dev/web-utility/
[18]: https://web-cell.dev/iterable-observer/
[19]: https://github.com/EasyWebApp/MarkCell
[20]: https://github.com/Microsoft/TypeScript/issues/20469
[21]: https://github.com/EasyWebApp/WebCell/blob/v2/Contributing.md
