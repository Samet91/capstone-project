import React from 'react'
import Button from './Button'

export default {
  title: 'Component/Button',
  component: Button,
}

export const Add = (): JSX.Element => (
  <Button onClick={() => console.log('Add Costs')}>Add Costs</Button>
)
