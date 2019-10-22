import Control from './control';
import Preview from './preview';

if (typeof window !== 'undefined') {
  window.netlifyJsonControl = Control;
  window.netlifyJsonPreview = Preview;
}

export { Control as netlifyJsonControl, Preview as netlifyJsonPreview };
