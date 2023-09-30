import React from 'react';

/**
 * Renders a single feature item.
 * @param {Object} feature - The feature object containing icon, title and text.
 * @param {string} feature.icon - The URL of the feature icon.
 * @param {string} feature.title - The title of the feature.
 * @param {string} feature.text - The text of the feature.
 * @returns {JSX.Element} - The JSX code for a single feature item.
 */
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