import { init } from 'netlify-cms-app';
import './previews';
import collections from './collections';

init({
  config: {
    backend: {
      name: 'github',
      repo: 'bitcoin-portal/bitcoincom-boilerplate',
      branch: 'netlify',
      base_url: 'https://netlify-oauth-github.herokuapp.com',
    },
    load_config_file: false,
    media_folder: 'static/images/uploads',
    public_folder: '/images/uploads',
    publish_mode: 'editorial_workflow',
    collections,
  },
});
