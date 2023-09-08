import React, { Component } from "react";

export class NewsItem extends Component {

  

  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <>
        <div className="card my-5" style={{width: "18rem"}}>
        <img src={imageUrl ? imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"} className="card-img-top" alt="..." />

          {/* <img src={imageUrl?{imageUrl} : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"} className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
