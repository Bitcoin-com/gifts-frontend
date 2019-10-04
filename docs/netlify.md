# Netlify CMS

Netlify CMS is a git-based headless CMS, it offers a customizable interface for content managers to edit the webpages without having to go into the code. Netlify CMS will generate a commit based on the changes and push it to the `master` branch, or to another branch to allow review first depending on the config.

The configuration can be found in `/static/admin/config.yml` for more details please refer to the [official documentation](https://www.netlifycms.org/docs/configuration-options/)

Let's see how to add some editable properties in Netlify, we have `MyView` component that contains localized strings and some other properties such as links for example, here is the file structure

```
/src
  /MyView
    index.js
    MyView.js
    styled.js
    data.json
    Preview.js
    withData.js
```

The content that will be editable is located in the `data.json` file, here is an example

```json
{
  "messages": [
    { "id": "views.MyView.title", "text": "This is MyView's title" }
  ],
  "settings": {
    "links": {
      "google": "https://www.google.com"
    }
  }
}
```

The localization process is explained in details [here](/localization.md) but let's see how this works with Netlify. Now that we have the `data.json` file, we need to add it's structure in our Netlify's config, which as described earlier, is located in `/static/admin/config.yml`

```yml
backend:
  name: 'github' # Method for pushing the changes
  repo: 'bitcoin-portal/bitcoincom-homepage' # Repository to which the edited content need to be committed
  branch: 'master' # Branch where to commit
  base_url: 'https://netlify-oauth-github.herokuapp.com' # Authentication URL
media_folder: 'static/images/uploads'
public_folder: '/images/uploads'
publish_mode: editorial_workflow # This setting control wether to push directly to the branch of to push to another branch for review
collections:
  - label: 'MyView' # This will contain the editable content for MyView component
    name: 'views.MyView' # Just a name to differentiate it from others
    extension: 'json' # File extension
    format: 'json' # File format
    files:
      - label: 'Data' # Name of the editable content
        name: 'views.MyView.data' # Again, just a name to differentiate this file from others
        file: 'src/views/MyView/data.json' # File where the content is located
        fields: # First level of JSON
          - name: 'messages' # messages key that contains all the localized strings
            label: 'Messages'
            label_singular: 'Message'
            widget: 'list' # the messages value is an array, so we use the list widget
            fields: # We precise the type of the array's values
              - { name: 'id', widget: 'hidden' }
              - { name: 'text', widget: 'string' }
          - name: 'settings' # settings key that contain other stuff such as links
            label: 'Settings'
            widget: 'object' # settings value is an object
            fields: # We describe each sub-key of the settings object
              - name: 'links'
                widget: 'object'
                fields:
                  - { name: 'google', widget: 'string' }
```

Once we have our config ready, we need to take care of the preview pane, let's check out the `Preview.js` in `/MyView`

```jsx
import React from 'react';
import { StyleSheetManager } from 'styled-components';
import MyView from './MyView';

const Preview = props => {
  // Netlify renders the component inside an iframe, this piece of code, get the iframe's head element to allow styled-component to add style sheets
  const iframe = document.getElementsByTagName('iframe')[0];
  const iframeHeadElem = iframe.contentDocument.head;
  return (
    <StyleSheetManager target={iframeHeadElem}>
      <MyView
        // We pass the messages data from Netlify to the component
        messages={props.entry.toJS().data.messages}
        // We pass the settings data from Netlify to the component
        settings={props.entry.toJS().data.settings}
      />
    </StyleSheetManager>
  );
};

export default Preview;
```

Pretty straightforward we simply render the `MyView` component passing the props we receive from Netlify. To use that `Preview` component there is another step. We have a cms config file in `src/cms/cms.js` let's see how it works

```js
import CMS from 'netlify-cms';
import MyViewPreview from '../views/MyView/Preview';

// Here we precise that for the views.MyView.data we want to use MyViewPreview for the preview pane
CMS.registerPreviewTemplate('views.MyView.data', MyViewPreview);
```

Nothing complicated here, just need to remember to do this, or the `Preview` component won't be used.

Now let's see how to use the data from `data.json` and the data passed by Netlify, next example is our `MyView.js`

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { DataProvider } from './withData';
import data from './data.json';

const MyView = ({ messages, settings }) => (
  <DataProvider
    value={{
      ...data,
      messages: messages === null ? data.messages : messages,
      settings: settings === null ? data.settings : settings,
    }}
  >
    {/* Child components */}
  </DataProvider>
);

MyView.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  settings: PropTypes.object,
};

MyView.defaultProps = {
  messages: null,
  settings: null,
};

export default MyView;
```

We have a `DataProvider` component that uses React's Context API to provide data to children components, this part is covered in the [localization doc](/localization.md). The value of the `DataProvider` is coming from the props if those props exist (only used in the `Preview` component), otherwise it gets data from the `data.json` file directly. This is important because if we only use `data.json`, when the user changes something in Netlify, they won't see the changes being applied live.

To use the data from the context, we simply use the `withData` HOC, this part is also covered in the [localization doc](/localization.md).

Once all this is done, you should be able to see your editable content in Netlify and have the preview pane showing `MyView`.
Netlify is pulling the file from the repo directly so if you made change to `data.json` you will need to push it first before being able to see it in Netlify.
