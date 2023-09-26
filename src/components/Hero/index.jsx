import React, { useContext } from 'react';
import { dataContext } from '../../app/data/DataContext';

export default function Hero() {
    const { heroData } = useContext(dataContext);
    const { img, title, text1, text2, text3, subText } = heroData;
    return (
        <section className="hero">
            <img src={img} alt="Argent Bank Trees" />
            <div className="hero__content">
                <h2 className="sr-only">{title}</h2>
                <p>{text1}</p>
                <p>{text2}</p>
                <p>{text3}</p>
                <span>{subText}</span>
            </div >
            </section>
    );
}

                
        