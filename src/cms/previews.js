import CMS from 'netlify-cms-app';
import { HomePreview } from '../views/Home/config/netlify';
import { Error404Preview } from '../views/404/config/netlify';
import { FaqPreview } from '../views/Faq/config/netlify';

CMS.registerPreviewTemplate(`home.content`, HomePreview);
CMS.registerPreviewTemplate(`404.content`, Error404Preview);
CMS.registerPreviewTemplate(`faq.content`, FaqPreview);
