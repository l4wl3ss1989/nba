import React, { useState, useEffect } from 'react';
import axios from '../../../config/axios.nba';
import cookie from 'react-cookies';

import { URL_TEAMS } from '../../utils/paths';

const initialState = {
  pollTeams: [],
  error: false
};

const Poll = () => {
  const [poll, setPoll] = useState(initialState);
  const { pollTeams, error } = poll;

  useEffect(() => {
    const getPoll = async () => {
      try {
        const { data } = await axios.get(
          `${URL_TEAMS}?poll=true&_sort=count&_order=desc`
        );
        setPoll({ pollTeams: data, error: false });
      } catch (err) {
        console.log(err);
        setPoll(prevPoll => ({ ...prevPoll, error: err }));
      }
    };
    getPoll();
  }, []);

  const addCount = async (id, count) => {
    const getCookie = cookie.load('poll');
    const userHasNotVoted = !getCookie;
    if (userHasNotVoted) {
      try {
        const { data } = await axios.patch(`${URL_TEAMS}/${id}`, {
          count: count + 1
        });
        const updatedPollTeams = pollTeams.map(pollTeam => {
          if (pollTeam.id === data.id) return { ...data };
          return pollTeam;
        });
        cookie.save('poll', true);
        setPoll(prevPoll => ({
          ...prevPoll,
          pollTeams: updatedPollTeams
        }));
      } catch (err) {
        console.log(err);
        setPoll(prevPoll => ({ ...prevPoll, error: err }));
      }
    } else {
      setPoll(prevPoll => ({ ...prevPoll, error: 'Already voted!' }));
    }
  };

  const showPoll = () => {
    const position = ['1ST', '2ND', '3RD'];
    return pollTeams.map((pollTeam, index) => {
      const { id, name, logo, count } = pollTeam;
      return (
        <div key={id} className="poll_item" onClick={() => addCount(id, count)}>
          <img alt={name} src={`images/teams/${logo}`} />
          <h4>{position[index]}</h4>
          <div>{count} votes</div>
        </div>
      );
    });
  };

  return (
    <div className="home_poll">
      <h3>Who will be the next champion</h3>
      <div className="poll_container">{showPoll()}</div>
      {error ? (
        <div style={{ color: 'red' }}>
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Poll;
