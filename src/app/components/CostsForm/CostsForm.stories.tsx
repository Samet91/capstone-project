import React from 'react'
import CostsForm from './CostsForm'

export default {
  title: 'Component/Form',
  component: CostsForm,
}

export const AddForm = (): JSX.Element => (
  <CostsForm onSubmit={() => console.log('Submitted')} />
)
