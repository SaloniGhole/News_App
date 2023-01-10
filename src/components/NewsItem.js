import React from 'react'

const NewsItem = (props) => {
    let {title, description, imageUrl, newsUrl, author, date} = props;
    return (
      <div>
        <div className="card">
  <img src={!imageUrl?"https://images.hindustantimes.com/img/2022/10/30/1600x900/top_cities_best_air_quality_aqi_last_24_hours_list_1667139611540_1667139611687_1667139611687.jpg":imageUrl}/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-danger">Read More</a>
  </div>
</div>
      </div>
    )
}

export default NewsItem
