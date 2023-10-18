import React from 'react'

const AccountContext = React.createContext({
  activeUsername: '',
  activePassword: '',
  changeUsername: () => {},
  changePassword: () => {},
})
export default AccountContext
