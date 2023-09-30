import React, { useContext } from 'react'
import { dataContext } from '../../app/data/DataContext'
import AccountItem from '../AccountItem'

/**
 * Renders the account details section.
 * @returns {JSX.Element} The account details section.
 */
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