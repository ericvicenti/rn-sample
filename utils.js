
const queryString = require('query-string');

let uniqueRouteCount = 0;

import {
  StateUtils,
} from './react-navigation/lib/react-navigation';

export function parseUrlWithPrefix(url, prefix) {
  let query = '?';
  let path = '/';
  if (url && url.split(prefix).length > 1) {
    const urlWithoutPrefix = url.split(prefix)[1];
    const indexOfQuerySplit = urlWithoutPrefix.indexOf('?');
    if (indexOfQuerySplit !== -1) {
      path = urlWithoutPrefix.slice(0, indexOfQuerySplit);
      query = urlWithoutPrefix.slice(indexOfQuerySplit);
    } else {
      path = urlWithoutPrefix;
    }
  }
  const params = queryString.parse(query);
  return {
    path,
    params,
  };
}

export function createActionRouteMap(configs) {
  return {
    reduce(state, action) {
      const config = configs.find(c => c.type === action.type);
      if (config) {
        const {type, reducer} = config;
        let lastRoute;
        if (state) {
          lastRoute = state.routes[state.index];
        }
        if (lastRoute && lastRoute.type === type) {
          const newState = reducer ? reducer(lastRoute.state, action) : lastRoute.state;
          if (newState !== lastRoute.state) {
            return StateUtils.replaceAtIndex(state, state.index, {
              ...lastRoute,
              state: newState,
            });
          }
        } else {
          const pushState = reducer ? reducer(null, action) : action;
          if (pushState) {
            const newRoute = {
              key: `${type}_${Date.now()}_${uniqueRouteCount++}`,
              type: type,
              state: pushState,
            };
            if (state) {
              return StateUtils.push(state, newRoute);
            } else {
              return {
                routes: [newRoute],
                index: 0,
              };
            }
          }
        }
      }
      if (state && state.routes.length > 1 && action.type === 'BACK') {
        return StateUtils.pop(state);
      }
      if (action.type === 'JUMP_TO') {
        const destRoute = state.routes.find(r => r.key === action.key);
        const destIndex = state.routes.indexOf(destRoute);
        if (destRoute && state.index !== destIndex) {
          return {
            ...state,
            index: destIndex,
          };
        }
      }
      return state;
    },
    getTitle(route) {
      const config = configs.find(c => c.type === route.state.type);
      if (config) {
        return config.getTitle(route.state);
      }
      return null;
    },
    getRenderer(type) {
      const config = configs.find(c => c.type === type);
      if (config) {
        return config.renderer;
      }
      return null;
    },
  };
}

export const BaseActions = {
  back: () => ({
    type: 'BACK',
  }),
  jumpTo: (key) => ({
    type: 'JUMP_TO',
    key,
  }),
};
