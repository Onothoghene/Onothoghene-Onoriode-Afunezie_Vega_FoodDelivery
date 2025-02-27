import React from 'react'
import { FaPhone, FaShippingFast, FaSyncAlt } from 'react-icons/fa';

const HomeFeatureSection = () => {
  return (
    <div className="row text-center justify-content-center bg-light py-4 rounded">
    {features.map((feature) => (
        <div key={feature.id} className="col-md-4 d-flex flex-column align-items-center">
            <div className="feature-icon d-flex justify-content-center align-items-center mb-2">
                {/* <FontAwesomeIcon icon={feature.icon} className="text-warning fs-2" /> */}
                {feature.icon}
            </div>
            <h5 className="fw-bold">{feature.title}</h5>
            <p className="text-muted">{feature.description}</p>
        </div>
    ))}
</div>
  )
}

export default HomeFeatureSection

const features = [
    {
        id: 1,
        icon: <FaShippingFast className="text-warning fs-2" />,
        title: "Fast Delivery",
        description: "Lorem ipsum dolor sit amet",
    },
    {
        id: 2,
        icon: <FaPhone className="text-warning fs-2" />,
        title: "24/7 Support",
        description: "consectetur adipisicing elit",
    },
    {
        id: 3,
        icon: <FaSyncAlt className="text-warning fs-2" />,
        title: "Refund",
        description: "Dicta sint dignissimos, rem commodi",
    },
];