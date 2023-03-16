import React from "react";
import "./card.css";

function Card(props) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={props.poster_path} alt={props.original_title} />
      </div>
      <div className="card-content">
        <h5
          className="card-title"
          dangerouslySetInnerHTML={{
            __html: props.original_title,
          }}
        ></h5>
        <p className="card-description">{props.overview}</p>
        <div className="card-tags">
          {props.genres?.map((tag, index) => (
            <span key={index} className="card-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="card-info">
          <p className="card-release">{props.release_year}</p>
          <p className="card-vote">{props.vote_average}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
