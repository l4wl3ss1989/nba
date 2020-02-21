import React, { useState, useEffect } from 'react';
import axios from '../../../config/axios.nba';
// import Slider from 'react-slick';

import { URL_SLIDES } from '../../utils/paths';
import Slider from 'react-slick';

const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToSCroll: 1
};

const HomeSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await axios.get(URL_SLIDES);
        setSlides(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSlides();
  }, []);

  const hasSlides = slides.length > 0;

  return (
    <>
      {hasSlides && (
        <Slider {...settings}>
          {slides.map(slide => {
            const { id, topic, title, cover } = slide;
            return (
              <div key={id}>
                <div
                  className="item_slider"
                  style={{ background: `url(/images/covers/${cover})` }}
                >
                  <div className="caption">
                    <h4>{topic}</h4>
                    <p>{title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      )}
    </>
  );
};

export default HomeSlider;
