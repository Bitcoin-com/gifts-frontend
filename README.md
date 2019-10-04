# Bitcoin.com Boilerplate

### ! NEED TO BE UPDATED !

Home and most other pages and subdomains for bitcoin.com

## Installation, development & build

### Requirements

- [Node.js (LTS)](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install)
- [Gatsby CLI](https://www.gatsbyjs.org/tutorial/part-zero/#-install-the-gatsby-cli-tool)

Github setup with SSH to use when installing bitcoincom-storybook package/private repo. See below link for a guide on how to setup SSH.

http://nts.strzibny.name/using-private-github-repositories-with-yarn-and-npm-in-package-json/)

### Install

```
yarn install
```

### Develop

```
yarn start
```

or (if nothing loads or Windows users)

```
yarn start:local
```

Then navigate to [localhost:3000](http://localhost:3000)

### Build

```
yarn build
```

After running the command, the built project can be found in `/public`

## Create new Page (Quick Start)

Use following steps to create a page, view, data/content and config. Copy/paste/edit from an exsisting page is quickest way to go about it.

1. Create data files in `src/data/[page]/`

   - locales/ - en.json
   - settings.json

2. Create view in `src/views/[PageName]/`

   - config/ - gatsby.js - netlify.js
   - [Page].js
   - index.js
   - SEO.js
   - styled.js

3. Create page in `src/pages/[page-slug-name].js`

4. Add build script created in step 2 to gatsby-node.js

5. Add netlify preview and config created in step 2 to `src/cms/cms.js`

## Subdomains

Extra steps are required to make subdomains.

* gatsby config needs to include makePath as `/` for base page on subdomain and all subpages need to be based off that. Eg, `/buy` should be `/` and `/buy/bch` should be `/bch`
* Subdomains need to be added to `subdomains.json` file with subdirectory path and any exclusions (optional) for sitemap and robots generation

## Documentation

- [File structure](/docs/file-structure.md)
- [Dependencies](/docs/dependencies.md) _out of date. Will update closer to project completion as this list will change_
- [Localization](/docs/localization.md) _out of date_
- [Styling](/docs/styling.md)
- [Storybook](/docs/storybook.md) _out of date - storybook now has it's own repo [here](https://github.com/bitcoin-portal/bitcoincom-storybook)_
- [Netlify CMS](/docs/netlify.md) _out of date_
- [Visual Studio Code](/docs/vscode.md)

## Useful links

- [React documentation](https://reactjs.org/docs/)
- [Styled components documentation](https://www.styled-components.com/docs)
- [Gatsby documentation](https://www.gatsbyjs.org/docs/)
- [React Helmet documentation](https://github.com/nfl/react-helmet)
- [Netlify CMS documentation](https://www.netlifycms.org/docs/add-to-your-site/)
- [Storybook documentation](https://storybook.js.org/basics/guide-react/)
