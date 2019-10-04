import CMS from 'netlify-cms-app';
import { HomePreview } from '../views/Home/config/netlify';

CMS.registerPreviewTemplate(`home.content`, HomePreview);
