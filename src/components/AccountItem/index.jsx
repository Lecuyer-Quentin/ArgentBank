import React from 'react'

/**
 * Renders an account item with its title, text, subText and a button to view transactions.
 * @param {Object} account - The account object containing the title, text and subText properties.
 * @param {string} account.title - The title of the account.
 * @param {string} account.text - The account number.
 * @param {string} account.subText - The account type.
 * @returns {JSX.Element} - The account item component.
 */
const AccountItem = ({account}) => {
    const { title, text, subText } = account;
    return (
        <>
            <h3 className='account__details__title'>{title}</h3>
            <p className='account__details__number'>{text}</p>
            <p className='account__details__subText'>{subText}</p>
        
            <button className='account__details__button'>
                View transactions
            </button>
        </>
    )
}

export default AccountItem