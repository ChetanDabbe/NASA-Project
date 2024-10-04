import React, { useState } from 'react';
import './ReadMore.css';

const ReadMore = () => {
    const [readMore, setReadMore] = useState(false);
    
    const handleToggle = () => {
        setReadMore(!readMore);
    };

    const goToMainPage = () => {
        window.location.href = '/';
    };
    
    return (
        <div className="read-more-container">
            <h2>Comprehensive Water Solutions for Sustainable Agriculture</h2>
            <p>
                Agriculture is essential for global food security, but it also consumes about 70% of the world’s freshwater. 
                With increasing water scarcity, it is critical to adopt sustainable water management solutions in the agricultural sector.
                We provide a range of innovative solutions to tackle water-related issues while improving productivity.
            </p>
            <p>
                Our aim is to help farmers optimize water usage through efficient irrigation systems, conservation practices, and advanced technology.
                With our solutions, we ensure long-term sustainability, increased yield, and reduced water consumption.
            </p>

            {readMore && (
                <div className="read-more-content">
                    <p>
                        <strong>Precision Irrigation:</strong> Modern irrigation systems, like drip irrigation, ensure water reaches the roots of plants without any wastage. 
                        It reduces water consumption by up to 50% compared to traditional methods.
                    </p>
                    <p>
                        <strong>Automated Irrigation Systems:</strong> Automated systems monitor soil moisture and control water application in real-time, 
                        helping farmers conserve water while maintaining crop health.
                    </p>
                    <p>
                        <strong>Water Quality Monitoring:</strong> By monitoring water quality, farmers can ensure that they are using clean, non-contaminated water 
                        for irrigation, preventing potential harm to crops and soil.
                    </p>
                    <p>
                        <strong>Groundwater Management:</strong> Our technologies help manage groundwater extraction, ensuring sustainable use without depleting resources.
                    </p>
                    <p>
                        <strong>Climate-Adaptive Water Solutions:</strong> We integrate climate data with water management strategies to help farmers respond to changing 
                        weather patterns, ensuring resilient crop production.
                    </p>
                    <p>
                        <strong>Flood and Drought Management:</strong> With advanced sensors and AI-driven analytics, we help predict and mitigate the impacts of 
                        floods and droughts, minimizing water loss and crop damage.
                    </p>
                </div>
            )}
            
            <button onClick={handleToggle} className="read-more-button">
                {readMore ? "Show Less" : "Read More"}
            </button>

            <button onClick={goToMainPage} className="main-page-button">
                Go to Main Page
            </button>
        </div>
    );
};

export default ReadMore;
