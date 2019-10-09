# Bitcoin.com Boilerplate

Gatsby starter project for static web pages.

## Getting started

### Requirements

Before installing the project, you will need to make sure you have the following tools installed:

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install)

We use two private dependencies, [bitcoincom-storybook](https://github.com/bitcoin-portal/bitcoincom-storybook) and [bitcoincom-universal](https://github.com/bitcoin-portal/bitcoincom-universal). You will need to make sure you have access to those repositories and that SSH is setup correctly.

### Installation

First clone the repository:

```
git clone git@github.com:bitcoin-portal/bitcoincom-boilerplate.git
```

Then install the dependencies using Yarn:

```
yarn install
```

### Develop

To start working on the project, simply run:

```
yarn start
```

If nothing happens or if you're using Windows, you might need to run the following command instead:

```
yarn start:local
```

You should then be able to navigate to [localhost:3000](http://localhost:3000).

### Build

To build the static website, use the following command:

```
yarn build
```

After running the command, the built project can be found in `/public`.

## Create new page (example)

This boilerplate comes with two pages, index and 404. The index page serve as an example, that's where you should start. The 404 page is used in case the user visits a non-existing page, feel free to modify it to your liking.

We will now see how to add a new page, we will call it "example", it will be accessible at [localhost:3000/example](http://localhost:3000/example).

1. Create the page in the `src/pages/`. We recommend to copy/paste the `index.js` file and rename it `example.js`. You should end up with `src/pages/example.js`.

   Inside this file, rename all occurrences of `IndexPage` to `ExamplePage`.

2. Create the `Example` view component inside `src/views`. Again, we recommend to simply copy/paste the `/Home` folder and rename into `/Example`. You should end up with `src/views/Example`.

   Inside this folder, rename `Home.js` to `Example.js`.

   Open `index.js` and change the following line

   ```js
   export { default } from './Home';
   ```

   to

   ```js
   export { default } from './Example';
   ```

   Open `Example.js`, remove any unnecessary content from the component and rename the component to `Example`, make sure to also change the `export default` line and the `propTypes` declaration.

   Fill the component with whatever content you like, for example:

   ```jsx
   const Example = () => <div>Hello World!</div>;
   ```

   To use this new component, we need to import it in the example page. Open the `src/pages/example.js` file, rename all occurrences of `Home` to `Example`, the import line should be changed:

   ```js
   import Example from '../views/Example';
   ```

   and the content of the component as well:

   ```jsx
   <Example locale={pageContext.locale} />
   ```

3. Add data files to `src/data`. We recommend to copy/paste the `/home` folder to start with and rename to `/example`. You should end up with `src/data/example`

   Inside the folder you should have a `/locales` folder, and inside, one JSON for each supported language.

   Let's say we will only support English for now, delete any other file, but keep `en.json`.

   Open the `en.json` file, this is where we keep all the data that will be editable inside Netlify CMS.

   We usually keep a key called `meta` where we have content related to SEO.

   As you might have noticed, if you've copied the `src/views/Home` folder to create the new view component, you should have a `SEO.js` file.

   Now, you should open this file and change all occurrences of `home.meta.` to `example.meta.`.

   Also make sure to adapt the content in the `en.json` file, for example of:

   ```json
   {
     "meta": {
       "title": "Example | Bitcoin.com",
       "description": "Bitcoin.com Example page",
       "twitter": "bitcoincom",
       "image": "/images/uploads/facebook.png"
     }
   }
   ```

   Now let's say we want to make the content of our Example, created in Step 2, editable. Let's go back to `src/views/Example/Example.js`. There replace with the following:

   ```jsx
   const Example = () => (
     <div>
       <FromattedMessage id="example.content.hello" />
     </div>
   );
   ```

   Make sure to import `FromattedMessage`:

   ```js
   import { FromattedMessage } from 'react-intl';
   ```

   And now let's go back to our data file, `src/data/example/locales/en.json` and add the following line under the `meta` object:

   ```json
   {
     "meta": {},
     "content": {
       "hello": "Hello World!"
     }
   }
   ```

   That's it, your content will now be editable in Netlify (we still need to configure Netlify though), and it will be translated in another language if you provide another locale file and the user changes the language.

4. We will now configure Netlify CMS to list our new page. Open the `src/views/Example/config/netlify.js` file. This file contains the preview that will be shown to the user inside Netlify and the configuration telling Netlify what fields are editable and what type those fields are (string, boolean, number, etc).

   Let's rename the different part:

   ```js
   import Home from '../Home';
   ```

   ```js
   import Example from '../Example';
   ```

   ***

   ```js
   export const HomePreview
   ```

   ```js
   export const ExamplePreview
   ```

   ***

   ```jsx
   <IntlProvider
     locale={DEFAULT_LOCALE}
     defaultLocale={DEFAULT_LOCALE}
     messages={flattenMessages(messages, 'home')}
   >
   ```

   ```jsx
   <IntlProvider
     locale={DEFAULT_LOCALE}
     defaultLocale={DEFAULT_LOCALE}
     messages={flattenMessages(messages, 'example')}
   >
   ```

   ***

   ```jsx
   <Layout location={{ pathname: '/' }}>
   ```

   ```jsx
   <Layout location={{ pathname: '/example' }}>
   ```

   ***

   ```jsx
   <Home locale={DEFAULT_LOCALE} />
   ```

   ```jsx
   <Example locale={DEFAULT_LOCALE} />
   ```

   ***

   ```js
   HomePreview.propTypes =
   ```

   ```js
   ExamplePreview.propTypes =
   ```

   ***

   ```js
   export const homeConfig =
   ```

   ```js
   export const exampleConfig =
   ```

   ***

   ```js
   label: 'Home',
   name: 'home.content',
   file: 'src/data/home/locales/en.json',
   ```

   ```js
   label: 'Example',
   name: 'example.content',
   file: 'src/data/example/locales/en.json',
   ```

   The rest will depend on the content of the page, but if we take the example created in Steps 2 and 3, we will need to add the following:

   ```js
   export const exampleConfig = {
     label: 'Example',
     name: 'example.content',
     file: 'src/data/example/locales/en.json',
     fields: [
       // Meta...
       {
         widget: 'object',
         name: 'content',
         fields: [{ name: 'hello', widget: 'string' }],
       },
     ],
   };
   ```

   Once we're done, we need to add our configuration in Netlify CMS files located at `src/cms`.

   Let's first add the preview component inside the `previews.js` file like so:

   ```js
   // Other imports...
   import { ExamplePreview } from '../views/Example/config/netlify';

   // Other CMS.registerPreviewTemplate calls...
   CMS.registerPreviewTemplate(`example.content`, ExamplePreview);
   ```

   And now let's import the config inside `collections.js`:

   ```js
   // Other imports...
   import { exampleConfig } from '../views/Example/config/netlify';

   const pageConfigs = {
     name: 'pages',
     label: 'Pages',
     files: [
       // Other configs...
       exampleConfig,
     ].sort(sortItems),
   };
   ```

   Now our content is configured and will appears in Netlify CMS!

5. The last step is to configure Gatsby. Open `src/views/Example/config/gatsby.js`. In this file we only have to import our locales file, in our case there is only `en.json`, so let's import it:

   ```js
   const enMessages = require('../../../data/example/locales/en.json');

   const translationMessages = {
     en: flattenMessages(enMessages, 'example'),
   };
   ```

   That's all the rest of the file should already be configured correctly.

   Let's now tell Gatsby to build our page, open `gatsby-node.js` at the root of the project.

   We first have to import our page config:

   ```js
   const {
     onCreatePage: exampleBuild,
   } = require('./src/views/Example/config/gatsby');
   ```

   Then we need to add a condition, if the path of the page Gatsby is building is `/example/` then use our custom build config:

   ```js
   if (page.path === '/example/') return exampleBuild(params);
   ```

   That's it, now if you run `yarn start`, our new page should show up at [localhost:3000/example](http://localhost:3000/example).

   If you need to handle any specific case like rendering multiple pages based on markdown files, I would suggest checking how our other pages are built and Gatsby's doc.

## Styling

We use `styled-components` to generate CSS, it's a CSS-in-JS library, meaning we write the CSS using JavaScript, this allows to have more control, has we can use code inside the our CSS.

Instead of having classes, we have components with defined style.

For example

```js
// styled.js
import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: red;
  width: 100%;
  height: 500px;
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
    height: 500px;
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

You can find more details about `styled-components` on the [official website](https://www.styled-components.com/docs).

The general idea is to have a `styled.js` file per component, this file would contain all the styled-components required in that component.

## Theme

To have the more consistent styles we use a theme. This theme is imported from our storybook library like this:

```js
import { theme } from 'bitcoincom-storybook';
```

Whenever possible we should try to use properties from this theme.

You can checkout the current theme [here](https://github.com/bitcoin-portal/bitcoincom-storybook/blob/master/src/theme/theme.js).

Most of the properties are self-explanatory, one of the important ones is `spacing`, this should be used for most margins, paddings, etc, to have consistent spaces. We can multiply it like so:

```js
// styled.js
import styled from 'styled-components';
import { theme } from 'bitcoincom-storybook';

export const Wrapper = styled.div`
  padding: ${theme.spacing.unit * 2}px; // 8 * 2 = 16px
`;
```

## Linting and code formatting

Let's try to keep our code clean and have consistent formatting. To do so, the boilerplate includes `ESLint` and `Prettier`, we recommend installing extensions for both these libraries in your IDE.

### VS Code

If you're using Visual Studio Code, there are some plugins we recommend:

- [EditorConfig for VS Code](https://github.com/editorconfig/editorconfig-vscode)
- [ESLint](https://github.com/Microsoft/vscode-eslint)
- [Prettier - Code formatter](https://github.com/prettier/prettier-vscode)
- [TODO Highlight](https://github.com/wayou/vscode-todo-highlight)
- [vscode-styled-components](https://github.com/styled-components/vscode-styled-components)

And the workspace config:

```json
{
  "files.autoSave": "onFocusChange",
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "files.eol": "\n",
  "eslint.packageManager": "yarn",
  "eslint.alwaysShowStatus": true,
  "eslint.autoFixOnSave": true
}
```

## Useful links

- [React documentation](https://reactjs.org/docs/)
- [Styled components documentation](https://www.styled-components.com/docs)
- [Gatsby documentation](https://www.gatsbyjs.org/docs/)
- [React Helmet documentation](https://github.com/nfl/react-helmet)
- [Netlify CMS documentation](https://www.netlifycms.org/docs/add-to-your-site/)
