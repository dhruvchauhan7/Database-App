import React from 'react';
import { Link } from 'react-router-dom';
import "../style.scss";

function Functionality() {
    return (
        <div className="functionality-container">
            <h3>Hello Everyone. Feel free to use the below functionalities.</h3>
           
            <Link to="/two_categories" className="functionality-button"><button>Functionality 2</button></Link>
            <Link to="/good_ratings" className="functionality-button"><button>Functionality 3</button></Link>
            <Link to="/mostitems" className="functionality-button"><button>Functionality 4</button></Link>
            <Link to="/" className="functionality-button"><button>Functionality 5</button></Link>
            <Link to="/" className="functionality-button"><button>Functionality 6</button></Link>
            <Link to="/no_poor_reviews" className="functionality-button"><button>Functionality 7</button></Link>
            <Link to="/poor_reviews" className="functionality-button"><button>Functionality 8</button></Link>
            <Link to="/" className="functionality-button"><button>Functionality 8</button></Link>
            <Link to="/" className="functionality-button"><button>Functionality 10</button></Link>

        </div>
    )
}

export default Functionality;
