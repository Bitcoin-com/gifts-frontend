# Storybook

Storybook is a tool allowing us to preview and test our components separately, without context, completely isolated. We use it for all the re-usable components such as buttons, title, paragraph, charts, etc.

If you have to create a new component and know it will or might be re-used in other places, please create it in Storybook. Try to make it easily re-usable, customizable, by using props (think different colors, size, etc).

Don't forget to create a story for it, a story is the term used by Storybook to define the "presentation" of the component. There is a `/stories` sub-folder, please add it there. With all the variant possible.

Let's see an example, we have a button with two different style:

```js
// storybook/Button/Button.js
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  background-color: ${({ primary }) => (primary ? 'blue' : 'red')};
`;

Button.propTypes = {
  primary: PropTypes.bool,
};

Button.defaultProps = {
  primary: false,
};

export default Button;
```

Then create a story:

```jsx
// storybook/stories/index.js
import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../Button';

storiesOf('Button', module)
  .add('default', () => <Button>Button</Button>)
  .add('primary', () => <Button primary>Button</Button>);
```

If you use the command `yarn storybook` you should now have a server running on [http://localhost:9001](http://localhost:9001), visit that page and you should see the new `Button` component.

To use it in our pages import it like a regular component.

```jsx
// views/Home/Home.js
import React from 'react';
import Button from '../../storybook/Button';

const Home = () => (
  <div>
    <h1>This is the Home page</h1>
    <Button primary>Primary button from Storybook</Button>
  </div>
);

export default Home;
```
