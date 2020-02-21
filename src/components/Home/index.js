import React from 'react';

import HomeSlider from './Slider/Slider';
import Subscriptions from '../shared/Subscriptions/Subscriptions';
import Articles from './Articles/Articles';
import Poll from '../shared/Poll/Poll';

const Home = () => {
  return (
    <div>
      <HomeSlider />
      <Subscriptions />
      <div className="container">
        <Articles />
        <Poll />
      </div>
    </div>
  );
};

export default Home;
