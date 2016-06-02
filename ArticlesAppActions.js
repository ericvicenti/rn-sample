import ChatApp from './ChatApp';

import {BaseActions} from './utils';

const ArticlesAppActions = {
  ...BaseActions,
  ...ChatApp.Actions,
  post: (id) => ({
    type: 'POST',
    id,
  }),
  default: () => ({
    type: 'INDEX',
  }),
};

module.exports = ArticlesAppActions;
