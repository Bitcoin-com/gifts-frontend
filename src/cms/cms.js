import { init } from 'netlify-cms-app';
import './previews';
import collections from './collections';

init({
  config: {
    backend: {
      name: 'github',
      repo: 'bitcoin-portal/bitcoincom-boilerplate',
      branch: 'staging',
      base_url: 'https://netlify-oauth-github.herokuapp.com',
      use_graphql: true,
    },
    load_config_file: false,
    media_folder: 'static/images/uploads',
    public_folder: '/images/uploads',
    collections,
  },
});
