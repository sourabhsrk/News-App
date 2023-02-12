import React, { Component } from 'react'

export default class NewsItem extends Component {

  defaulturl = "https://www.livelaw.in/h-upload/2023/01/30/456257-prashant-bhushan-n-ram-and-mahua-moitra-india-the-modi-question-bbc-documentary.jpg";
  render() {
    let  {title,description,imgurl,newsUrl,author,date,source} = this.props;
    return (
    <div className="card">
      <div style={{display:'flex',justifyContent: 'flex-end',position:'absolute',right: '0'}}>
      <span className=" badge rounded-pill bg-danger">{source}</span>
      </div>
      <img src={imgurl?imgurl:this.defaulturl} className="card-img-top" alt="..."/>
      <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-danger">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read more</a>
      </div>
    </div>
    )
  }
}
