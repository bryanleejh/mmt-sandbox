# MMT Common Widgets

provide the common widgets to be used across marketing plugins

_Note: Components migrated to [Armor](https://armor.deliveryhero.com/) are currently in beta release and can be accessed at `v3.0.0-beta.X`. To contribute to the Armor migration, you can raised pull requests targeting the `armor` branch_

## Install

This package provides a compiled css file that you must include in your root file.

```typescript
import '@deliveryhero/mmt-widgets/build/styles.css';
```

To use the widgets from this package just import them into your component file.

```typescript
import { ComponentWidget } from '@deliveryhero/mmt-widgets';
```

## Development

1. Clone this repository

2. Run `yarn install`

3. Run `yarn link`

4. Run `cd node_modules/react && yarn link`

5. Run `cd ../react-dom && yarn link`

6. Go to your project and link all the following dependencies
   1. `yarn link @deliveryhero/mmt-widgets`
   2. `yarn link react`
   3. `yarn link react-dom`

7. Build this project using `yarn build`

8. Voila, happy developing!

## Deploy

1. Create a release tag in GitHub

2. Wait for the build and publish to finish

3. Install latest dependency

NPM
`npm install @deliveryhero/mmt-widgets@latest`

Yarn
`yarn add @deliveryhero/mmt-widgets@latest`
