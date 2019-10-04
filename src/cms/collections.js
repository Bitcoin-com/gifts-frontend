import { homeConfig } from '../views/Home/config/netlify';

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
  files: [homeConfig].sort(sortItems),
};

export default [pageConfigs];
