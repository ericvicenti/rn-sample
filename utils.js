
const queryString = require('query-string');

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

// export function createActionRouteMap(configs) {
//   return {
//     reduce(state, action) {
//       const config = configs.find(c => c.type === action.type);
//       if (config) {
//         const {type, reducer} = config;
//         const {children, index} = state;
//         const lastRoute = children[index];
//         if (lastRoute.type === type) {
//           const newState = reducer ? reducer(lastRoute.state, action) : lastRoute.state;
//           if (newState !== lastRoute.state) {
//             return StateUtils.replaceAtIndex(state, index, {
//               ...lastRoute,
//               state: newState,
//             });
//           }
//         } else {
//           const pushState = reducer ? reducer(null, action) : action;
//           if (pushState) {
//             return StateUtils.push(state, {
//               key: `${type}_${Date.now()}_${uniqueRouteCount++}`,
//               type: type,
//               state: pushState,
//             });
//           }
//         }
//       }
//       if (state && state.children.length > 1 && action.type === 'BACK') {
//         return StateUtils.pop(state);
//       }
//       return state;
//     }
//     render(props) {
//       const match = configs.find(c => c.type === props.scene.navigationState.type);
//       if (config) {
//         return config.renderer(props);
//       }
//       return null;
//     }
//   }
// }
