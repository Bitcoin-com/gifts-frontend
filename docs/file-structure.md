# File structure

On the first level, you can find most of the configuration related files.

The files related to Gatsby are:

```
gatsby-browser.js
gatsby-config.js
gatsby-node.js
gatsby-ssr.js
```

You can find documentation about those file here

- [gatsby-browser](https://www.gatsbyjs.org/docs/browser-apis/)
- [gatsby-config](https://www.gatsbyjs.org/docs/gatsby-config/)
- [gatsby-node](https://www.gatsbyjs.org/docs/node-apis/)
- [gatsby-ssr](https://www.gatsbyjs.org/docs/ssr-apis/)

The code formatting and linting file are

```
.editorconfig
.eslintrc
.prettierrc
```

Those files contain the configuration for the following libraries:

- Editor Config (Global settings such as indentation type, etc)
- ESLint (Code linter)
- Prettier (Code formatter)

The project configuration can be found in

```
package.json
```

All the dependencies are listed in that file, as well as project name, commands (such as start, build, etc)

The dependencies versions are kept in

```
yarn.lock
```

This file needs to be committed to ensure we all have the exact same versions when coding

The most important folder, `src`, is where all the code is kept.

```
/src
  /assets
  /cms
  /components
  /data
  /helpers
  /pages
  /views
  api.js
  i18n.js
  netlify.js
  settings.json
  theme.js
```


The `i18n.js` file contain the localization configuration, see more about it [here](/localization.md)

`settings.json` contains the global constants that need to be accessed in the code, such as links, meta tags content, etc. This file is editable through Netlify

The theme is kept in `theme.js`, see more about it [here](/styling.md)

The `assets` folder is where we keep all permenant the resources such as images, fonts, etc.

The `helpers` folder contains useful functions that are needed in multiple components, let's try to have each function in it's own file, like

```
/helpers
  getMessages.js
```

Let's see how the components are structured now, we have 4 folders containing components

```
/src
  /data
  /components
  /pages
  /views
```

`pages` is a folder required for Gatsby to work correctly, it will generate a route for each `.js` file found in there. So all our pages entry-points should be added here.

Next, we have the `views` folder, it's basically the same as `pages`, but we cannot have a folder structure the `pages` so we use `views` for this, so each page has a component in `views`.

A component should be structured like this:

```
/MyComponent
  index.js
  MyComponent.js
  messages.json
  SEO.js
  styled.js
```

- `index.js` is the entry-point, it simply exports the component from MyComponent.js
- `MyComponent.js` is where the actual component code is kept
- `messages.json` contains all the locales strings related to the component
- `SEO.js` contains all the SEO and meta tags related things, we use react-helmet to handle this
- `styled.js` is where we keep the styled-components used in the current component

That's the reason we need the `views` folder, in `pages` we can only one file per page.

Finally there is the `components` folder which contains the other components like page pieces and such.
