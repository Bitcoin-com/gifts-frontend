import CMS from 'netlify-cms-app';

import {
  netlifyJsonControl,
  netlifyJsonPreview,
} from '../components/CMSJsonWidget';

/* Custom Widgets */
CMS.registerWidget('json', netlifyJsonControl, netlifyJsonPreview);
