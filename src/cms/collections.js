import { homeConfig } from '../views/Home/config/netlify';
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

const pageConfigs = {
  name: 'pages',
  label: 'Pages',
  files: [homeConfig, error404Config].sort(sortItems),
};

export default [pageConfigs];
