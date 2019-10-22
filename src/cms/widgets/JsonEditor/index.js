import Control from './control';

if (typeof window !== 'undefined') {
  window.netlifyJsonControl = Control;
}

export { Control as netlifyJsonControl };
