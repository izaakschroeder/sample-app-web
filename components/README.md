# /components

Components are isolated units of functionality; they can essentially be considered their own modules, and are loaded as such (e.g. `require('carousel')`). They may include similar data to `/assets` such as fonts, images, styles and scripts, but unlike `/assets` these files do _not_ belong to the global scope.

Components may have their own `package.json`, tests and the like to further the idea that they exist in isolation. If a component becomes large enough it can then be spun off into its own real module and loaded via npm.
