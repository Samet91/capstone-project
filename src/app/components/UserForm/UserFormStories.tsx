import React from 'react'
import UserForm from './UserForm'

export default {
  title: 'Component/UserForm',
  component: UserForm,
}

function handleLoginSubmit(username: string, password: string): void {
  console.log(`Logged in ${username}, ${password}`)
}
export const UserLogin = (): JSX.Element => (
  <UserForm type="Login" onSubmit={handleLoginSubmit} />
)
