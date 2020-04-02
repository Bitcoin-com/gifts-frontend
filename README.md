# Bitcoin.com Gifts

React front end for interacting with gifts-api.bitcoin.com

Must set api URL and price corresponding to API price before deployment

Set `giftsBackendBase` in:

- `src/views/Home/GiftsPortal.js`

Gatsby starter project for static web pages. Many of Bitcoin.com's web properties are built with this starter.

## Boilerplate info

<!-- prettier-ignore -->
  - [Requirements](#requirements)
    - [Tools](#tools)
    - [Required access](#required-access)
    - [Configure npm/yarn for GitHub Packages](#configure-npmyarn-for-github-packages)
  - [Development](#development)
    - [Clone and install](#clone-and-install)
    - [Develop](#develop)
    - [Linting and code formatting](#linting-and-code-formatting)
    - [VS Code](#vs-code)
  - [Building and Deployment](#building-and-deployment)
  - [Useful links](#useful-links)

## Requirements

### Tools

Before installing the project, you will need to make sure you have the following tools installed:

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install)

### Required access

This starter has GitHub Packages for private dependencies so before starting, make sure you have access to the following repositories

- **Molten components** - [bitcoincom-pkg-components](https://github.com/bitcoin-portal/bitcoincom-pkg-components)
- **Molten themes** - [bitcoincom-pkg-theme](https://github.com/bitcoin-portal/bitcoincom-pkg-theme)

### Configure npm/yarn for GitHub Packages

Generate a [GitHub Personal access token](https://github.com/settings/tokens) with the following scopes

Run the following commands replacing `<github-auth-token>` with a **_Personal access token_** generated from [https://github.com/settings/tokens](https://github.com/settings/tokens). All commands should be run by developers, deployment configuration doesn't require all commands to be run (especially npm login).

```bash
# deploy config and developers
npm config set //npm.pkg.github.com/:_authToken <github-auth-token>
npm config set @bitcoin-portal:registry https://npm.pkg.github.com

# developers only
npm config set always-auth true
npm login --registry=https://npm.pkg.github.com
```

## Development

### Clone and install

```bash
# First clone the repository
git clone git@github.com:bitcoin-portal/bitcoincom-boilerplate.git

# Then install the dependencies using Yarn:
yarn install
```

### Develop

To start working on the project, simply run one of the following:

**Start with common settings**

Start the Gatsby local developement server.

```bash
yarn start

# Local:            http://localhost:3000/
# On Your Network:  http://192.168.1.16:3000/
```

**Start with default Gatsby settings**

Starts server with default gatsby settings. Use this if first command doesn't work (you're probably using Windows) or don't want to expose a port on the network your connected to.

```bash
yarn start:local

# Local:            http://localhost:8000/
```

### Creating pages

Documentation with examples and more details for development can be found here [Create a new page (with examples)](/docs/create-new-pages.md)

### Linting and code formatting

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

## Building and Deployment

To build the static website, use the following command:

```
yarn build
```

After running the command, the static built site can be found in `/public`.

## Useful links

- [React documentation](https://reactjs.org/docs/)
- [Styled components documentation](https://www.styled-components.com/docs)
- [Gatsby documentation](https://www.gatsbyjs.org/docs/)
- [React Helmet documentation](https://github.com/nfl/react-helmet)
- [Netlify CMS documentation](https://www.netlifycms.org/docs/add-to-your-site/)
