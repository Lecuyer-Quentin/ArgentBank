import { createContext, useState } from "react";

const HeroData = {
    img: require('../../assets/images/bank-tree.jpg'),
    title: 'Promoted Content',
    text1: 'No fees.',
    text2: 'No minimum deposit.',
    text3: 'High interest rates.',
    subText:'Open a savings account with Argent Bank today!' ,
}

const FeaturesData = [
    {
        icon: require('../../assets/images/icon-chat.webp'),
        title: 'You are our #1 priority',
        text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.'
    },
    {
        icon: require('../../assets/images/icon-money.webp'),
        title: 'More savings means higher rates',
        text: 'The more you save with us, the higher your interest rate will be!'
    },
    {
        icon: require('../../assets/images/icon-security.webp'),
        title: 'Security you can trust',
        text: 'We use top of the line encryption to make sure your data and money is always safe.'
    }
]

const AccountData = [
    {
        title: 'Argent Bank Checking (x8349)',
        text: '$2,082.79',
        subText: 'Available Balance'
    },
    {
        title: 'Argent Bank Savings (x6712)',
        text: '$10,928.42',
        subText: 'Available Balance'
    },
    {
        title: 'Argent Bank Credit Card (x8349)',
        text: '$184.30',
        subText: 'Current Balance'
    }
]





///////////////////////////////////////
export const dataContext = createContext();

export const FeaturesDataProvider = ({ children }) => {
    const [featuresData, setFeaturesData] = useState(FeaturesData);
    const addFeature = (feature) => {
        setFeaturesData([...featuresData, feature]);
    }
    return (
        <dataContext.Provider value={{ featuresData, addFeature }}>
            {children}
        </dataContext.Provider>
    )
}

export const HeroDataProvider = ({ children }) => {
    const [heroData, setHeroData] = useState(HeroData);
    const addHero = (hero) => {
        setHeroData([...heroData, hero]);
    }
    return (
        <dataContext.Provider value={{ heroData, addHero }}>
            {children}
        </dataContext.Provider>
    )
}

export const AccountDataProvider = ({ children }) => {
    const [accountData, setAccountData] = useState(AccountData);
    const addAccount = (account) => {
        setAccountData([...accountData, account]);
    }
    return (
        <dataContext.Provider value={{ accountData, addAccount }}>
            {children}
        </dataContext.Provider>
    )
}

    
