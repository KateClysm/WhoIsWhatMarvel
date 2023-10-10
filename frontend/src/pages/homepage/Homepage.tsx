import React, { useState } from 'react';
import './homepage.scss';

const Homepage: React.FC = () => {
    const [categories, setCategories] = useState(false);
    const [start, setStart] = useState(false);

    const handleStart = () => {
        setCategories(true);
        setStart(true);
    };
    
    return (

      <div className="container-homepage">

        <h2>Want to Find out how much you know about Heroism in Marvel?</h2>

        <button className={`button-start ${start ? 'invisible' : ''}`} onClick={handleStart}>START</button>

        <div className={`container-categories ${categories ? 'visible' : ''}`}>
            <button className="c25">25 Characters</button>
            <button className="c50">50 Characters</button>
            <button className="c75">75 Characters</button>
        </div>

      </div>

    );
};

export default Homepage;