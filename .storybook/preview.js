import '!style-loader!css-loader!sass-loader!./../src/styles/global.scss';
import { addParameters } from '@storybook/react';

addParameters({
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
});
