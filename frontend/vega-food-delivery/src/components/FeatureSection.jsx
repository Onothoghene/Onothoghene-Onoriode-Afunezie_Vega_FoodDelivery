import React from 'react'
import { FaBriefcase, FaMoneyBillAlt, FaShippingFast, FaSyncAlt } from 'react-icons/fa';

const FeatureSection = () => {
    return (
      <div className="feature-bg py-5 bg-light">
        <div className="container">
        <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="featured-text">
                <h2 className="pb-3">
                  Our <span className="text-warning">Services</span>
                </h2>
                <div className="row">
                  {[  
                    { icon: <FaShippingFast className='text-warning fs-3'/>, title: "Fast Delivery" },
                    { icon: <FaMoneyBillAlt className='text-warning fs-3'/>, title: "Best Price" },
                    { icon: <FaBriefcase className='text-warning fs-3'/>, title: "Custom Box" },
                    { icon: <FaSyncAlt className='text-warning fs-3'/>, title: "Quick Refund" }
                  ].map((item, index) => (
                    <div key={index} className="col-lg-6 col-md-6 mb-4">
                      <div className="d-flex p-3 bg-white shadow-sm rounded">
                        <div className="list-icon me-3">
                            {item.icon}
                        </div>
                        <div className="content">
                          <h3>{item.title}</h3>
                          <p className="mb-0">
                            Sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-5 text-center">
            <img src="https://i.pinimg.com/736x/c1/57/c3/c157c3b1e31c538fd14ea5da42dbe495.jpg" alt="Feature" className="img-fluid rounded" />
          </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default FeatureSection;