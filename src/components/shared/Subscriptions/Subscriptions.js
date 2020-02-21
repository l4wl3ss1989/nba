import React, { useState } from 'react';
import axios from '../../../config/axios.nba';

import { URL_SUBSCRIPTION } from '../../utils/paths';

const initialState = {
  email: '',
  error: false,
  success: false,
  alreadyIn: false
};

const Subscriptions = () => {
  const [user, setUser] = useState(initialState);
  const { email, error, success, alreadyIn } = user;

  const saveSubscription = async () => {
    try {
      const { data } = await axios.get(`${URL_SUBSCRIPTION}?email=${email}`);
      const userAlreadyExists = data.length > 0;
      if (!userAlreadyExists) {
        const { data: insertedUser } = await axios.post(URL_SUBSCRIPTION, { email });
        console.log('[insertedUser]', insertedUser);
        setUser(prevUser => ({ ...prevUser, email: '', success: true }));
      } else setUser(prevUser => ({ ...prevUser, alreadyIn: true }));
    } catch (err) {
      console.log(err);
      setUser(prevUser => ({
        ...prevUser,
        error: 'Sorry there was some problem.'
      }));
    }
    clearMessages();
  };

  const clearMessages = () => {
    setTimeout(() => {
      setUser(prevUser => ({
        ...prevUser,
        error: false,
        success: false,
        alreadyIn: false
      }));
    }, 2000);
  };

  const handleInputChange = event => setUser({ ...user, email: event.target.value });

  const handleSubmit = event => {
    event.preventDefault();
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isValidEmail = regex.test(email);
    if (isValidEmail) saveSubscription();
    else {
      setUser(prevUser => ({ ...prevUser, error: 'Check your email' }));
      clearMessages();
    }
  };

  return (
    <div className="subcribe_panel">
      <h3>Subscribe to us</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            placeholder="youremail@gmail.com"
            onChange={handleInputChange}
          />
          <div className={error ? 'error show' : 'error '}>{error}</div>
          <div className={success ? 'success show' : 'success '}>Thank you!</div>
          <div className={alreadyIn ? 'success show' : 'success '}>
            You are already in!
          </div>
        </form>
      </div>
      <small>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </small>
    </div>
  );
};

export default Subscriptions;
