import { init } from 'netlify-cms-app';
import './previews';
import './widgets';
import collections from './collections';

init({
  config: {
    logo_url: 'https://www.bitcoin.com/logo4x.png',
    site_url: 'https://boilerplate.bitcoin.com',
    display_url: 'https://bitcoin.com',
    backend: {
      name: 'github',
      repo: 'bitcoin-portal/bitcoincom-boilerplate',
      branch: 'schema',
      base_url: 'https://netlify-oauth-github.herokuapp.com',
      use_graphql: true,
    },
    load_config_file: false,
    media_folder: 'static/images/uploads',
    public_folder: '/images/uploads',
    collections,
  },
});
