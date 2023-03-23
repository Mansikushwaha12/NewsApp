import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    // destructuring
    let {title, description,imageUrl,newsUrl,author, date} = this.props;
    return (
      <div className='my-3'>
        {/* style=widhth: 18rem make a object ,,--- widhth is key ---18rem is string  */}
        <div className="card" >  
              <img src={!imageUrl? "https://s.w-x.co/in-fishes.jpg": imageUrl} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}<span className="badge bg-secondary">New</span></h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className='text-muted'>By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small></p>
                <a rel = "noreferrer" href={newsUrl} target="_blank" className="btn btn-sm  btn-dark">Read More</a>
              </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
