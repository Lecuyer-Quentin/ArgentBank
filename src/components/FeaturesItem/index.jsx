import React from 'react';

function FeaturesItem({ feature }) {
    const { icon, title, text } = feature;
    return (
        <div className="features__item">
            <img src={icon} alt={title} />
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
}

export default FeaturesItem;