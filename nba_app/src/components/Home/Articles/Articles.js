import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
import axios from '../../../config/axios.nba';

import { URL_BLOCKS } from '../../utils/paths';

const Aticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(`${URL_BLOCKS}?_limit=6&_sort=id&_order=desc`);
        setArticles(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchArticles();
  }, []);

  const showArticles = () => {
    const numElementXRow = 3;
    const rows = [...Array(Math.ceil(articles.length / numElementXRow))];
    const articlesRows = rows.map((row, i) =>
      articles.slice(i * numElementXRow, i * numElementXRow + numElementXRow)
    );

    return articlesRows.map(row => (
      <div className="row" key={uuid()}>
        {row.map(article => {
          const { id, title, image, desc } = article;
          return (
            <div key={id} className="four columns block_item">
              <Link to={`/article/${article.id}`}>
                <div className="top">
                  <div className="veil"></div>
                  <div
                    className="block_image"
                    style={{ background: `url(/images/blocks/${image})` }}
                  ></div>
                </div>
                <div className="content">
                  <h3>{title}</h3>
                  <div>{desc}</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    ));
  };

  return <div>{showArticles()}</div>;
};

export default Aticles;
