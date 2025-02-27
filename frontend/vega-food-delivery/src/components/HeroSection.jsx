import React from 'react';

const HeroSection = ({title, subtitle}) => {
  return (
    <section class="container-xxl py-5 bg-dark hero-header mb-5">
      <div class="container text-center my-5 pt-5 pb-4">
        {/* <h1 className='text-white'>Welcome to Vega Food Delivery</h1>
        <p className='text-white'>Delicious meals delivered to your doorstep!</p> */}

        <h1 className='text-white'>{title}</h1>
        <p className='text-white'>{subtitle}</p>
      </div>
    </section>
  );
};

export default HeroSection;