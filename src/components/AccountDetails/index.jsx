import React, { useContext } from 'react'
import { dataContext } from '../../features/data/DataContext'
import AccountItem from '../AccountItem'

const AccountDetails = () => {
    const { accountData } = useContext(dataContext);
  return (
      <section className='account'>
          {accountData.map((account, index) => (
              <div key={index} className='account__details'>
                  <AccountItem account={account} />
              </div>
            ))}
      </section>
  )
}

export default AccountDetails