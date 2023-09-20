import React from 'react'

const AccountItem = ({account}) => {
    const { title, text, subText } = account;
    return (
        <>
            <h3 className='account__details__title'>{title}</h3>
            <p className='account__details__text'>{text}</p>
            <p className='account__details__subText'>{subText}</p>
        
            <button className='account__details__button'>
                View transactions
            </button>
        </>


    
  )
}

export default AccountItem