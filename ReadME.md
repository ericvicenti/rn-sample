# Cross-Platform Navigation Demo

Run the same code on the web, iOS, and Android!  See a demonstration in my [React Europe 2016 talk](https://www.youtube.com/watch?v=dOSwHABLvdM).

### Usage

```
npm install

# Native:
npm install -g react-native-cli
react-native run-ios
react-native run-android

# Web:
npm install -g webpack
npm run build
npm start
# http://localhost:9000/
```

### Fork of NavigationExperimental

The main reason for the fork is to switch to commonJS dependencies for the benefit of Webpack support.

To build:
```
cd react-navigation
npm run build
```

Ideas for improvement are welcomed!

### Contributions and Maintenance

This was created as a demo for [my talk at React-Europe 2016](https://www.youtube.com/watch?v=dOSwHABLvdM).

PRs are welcomed, and issues can be used for discussion, but there is no long-term maintenance plan.
