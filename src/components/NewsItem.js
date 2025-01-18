import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsUrl,source,date,author } = this.props;
    return (
      <div className="my-3">
       <span className="badge rounded-pill text-bg-danger">{source}</span>
        <div className="card">
          <img
            src={imageurl ? imageurl : './newsimg.jpg'}
            className="card-img-top"
            alt="News"
          />
          <div className="card-body">
            <h5 className="card-title">{title ? title : "No Title Available"}</h5>
            <p className="card-text">
              {description ? description : "No Description Available"}
            </p>
            <p className="card-text"><small className="text-body-secondary">By {author?author:"unknown"} on {date}</small></p>
               <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
