# Styling

We use `styled-components` to generate CSS, it's a CSS-in-JS library, meaning we write the CSS using JavaScript, this allows to have more control, has we can use code inside the our CSS.

Instead of having classes, we have components with defined style.

For example

```js
// styled.js
import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: red;
  width: 100%;
  height: 100vh;
  color: blue;

  & > h1 {
    font-size: 4rem;
  }
`;
```

This would then be used like a regular component

```jsx
// MyComponent.js
import React from 'react';
import { Wrapper } from './styled';

const MyComponent = () => (
  <Wrapper>
    <h1>This is MyComponent</h1>
  </Wrapper>
);

export default MyComponent;
```

This is the same as doing

```html
<style>
  .my-class {
    background-color: red;
    width: 100%;
    height: 100vh;
    color: blue;
  }
  .my-class > h1 {
    font-size: 4rem;
  }
</style>
<div class="my-class">
  <h1>This is MyComponent</h1>
</div>
```

You can find more details about `styled-components` on the [official website](https://www.styled-components.com/docs)

The general idea is to have a `styled.js` file per component, this file would contain all the styled-components required in that component.

## Theme

To have the more consistent styles we use a theme (`/src/theme.js`)

Whenever possible we should try to use properties from this theme.

Let's see the details of this theme:

```js
const theme = {
  border: {
    radius: {
      default: 3,
      medium: 5,
    },
    solid: {
      default: '1px solid',
      medium: '3px solid',
    },
  },
  breakpoints: {
    sm: 424,
    md: 960,
  },
  palette: {
    primary: {
      main: '#0AC18E',
    },
    // ...
  },
  typography: {
    fontFamily: '"Gilroy", sans-serif',
  },
  spacing: {
    unit: 8,
  },
  transitions: {
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      easeIn: 'ease-in',
    },
    duration: {
      default: 300,
    },
  },
  zIndex: {
    default: 1,
    mobileMenu: 10,
  },
};
```

Most of the properties are self-explanatory, one of the important ones is `spacing`, this should be used for most margins, paddings, etc, to have consistent spaces. We can multiply it like so:

```js
// styled.js
import styled from 'styled=components';
import theme from '../../theme';

export const Wrapper = styled.div`
  padding: ${theme.spacing.unit * 2}px; // 8 * 2 = 16px
`;
```
