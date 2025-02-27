import React from 'react'
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomeAboutSection = () => {
    return (
        <div className="container my-5">
            <div className="row align-items-center">
                <div className="col-md-6 position-relative">
                    <img
                        src="https://i.pinimg.com/736x/98/b5/5b/98b55b61b77fb05cfe91063d39436f40.jpg"
                        alt="Fresh Fruits"
                        className="img-fluid rounded"
                    />
                    <div className="play-btn d-flex justify-content-center align-items-center">
                        {/* <FaPlay className="text-white fs-4" /> */}
                    </div>
                </div>

                <div className="col-md-6">
                    <p className="text-muted">Since Year 1999</p>
                    <h2 className="fw-bold">
                        We are <span className="text-warning">Vega-FD</span>
                    </h2>
                    <p className="text-muted">
                        Etiam vulputate ut augue vel sodales. In sollicitudin neque et
                        massa porttitor vestibulum ac vel nisi. Vestibulum placerat eget
                        dolor sit amet posuere.
                    </p>
                    <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapiente
                        facilis illo repellat veritatis minus, et labore minima mollitia
                        qui ducimus.
                    </p>
                    <Link className="btn btn-warning text-white px-4" to="/about">Know More</Link>
                </div>
            </div>
        </div>
    );
}

export default HomeAboutSection