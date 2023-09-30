
import React, { useContext } from 'react';
import FeaturesItem from '../FeaturesItem';
import { dataContext } from '../../app/data/DataContext';




/**
 * Renders a section with a list of features.
 * @function
 * @returns {JSX.Element} - Rendered component.
 */
function Features() {
    const { featuresData } = useContext(dataContext);
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {featuresData.map((feature, index) => (
                <FeaturesItem key={index} feature={feature} />
            ))} 
        </section>
    );
}

export default Features;