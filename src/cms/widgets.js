import CMS from 'netlify-cms-app';

import { netlifyJsonControl } from './widgets/JsonEditor';

/* Custom Widgets */
CMS.registerWidget('json', netlifyJsonControl);
