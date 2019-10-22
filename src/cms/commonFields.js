const fieldSchema = {
  label: 'Structured Data',
  name: 'schema',
  hint: 'Must be valid schema. See schema.org for more info',
  widget: 'json',
};

export const fieldMeta = {
  label: 'Page Meta',
  widget: 'object',
  name: 'meta',
  fields: [
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'description', label: 'Description', widget: 'text' },
    { name: 'twitter', label: 'Twitter', widget: 'string' },
    { name: 'image', label: 'SM Image', widget: 'image' },
    fieldSchema,
  ],
};

export const fieldNewsletter = {
  label: 'Newsletter',
  widget: 'object',
  name: 'newsletter',
  fields: [
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'text', label: 'Description', widget: 'text' },
    { name: 'button', label: 'Button Text', widget: 'string' },
    { name: 'acList', label: 'Active Campaign List', widget: 'string' },
  ],
};
