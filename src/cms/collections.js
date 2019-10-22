import { enHomeConfig, zhHomeCOnfig } from '../views/Home/config/netlify';
import { error404Config } from '../views/404/config/netlify';

const sortItems = (a, b) => {
  const labelA = a.label.toUpperCase();
  const labelB = b.label.toUpperCase();

  if (labelA < labelB) {
    return -1;
  }
  if (labelA > labelB) {
    return 1;
  }

  return 0;
};

const enConfigs = {
  name: 'pages.en',
  label: 'English',
  files: [enHomeConfig, error404Config].sort(sortItems),
};
const zhConfigs = {
  name: 'pages.zh',
  label: 'Chinese',
  files: [zhHomeCOnfig].sort(sortItems),
};

export default [enConfigs, zhConfigs];
