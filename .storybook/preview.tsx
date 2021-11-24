import React from 'react'
import { addDecorator } from '@storybook/react'
import { MemoryRouter } from 'react-router'

import '../src/app/GlobalStyles'
import GlobalStyles from '../src/app/GlobalStyles'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator((story) => (
  <MemoryRouter>
    <GlobalStyles />
    {story()}
  </MemoryRouter>
))
