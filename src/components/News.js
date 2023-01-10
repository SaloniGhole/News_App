import React,{useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  

   const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.catagory)} - NewsDaily`;
    updateNews();
  }, [])

  // const handlePrev = async () => {
  // setPage(page-1)
  //   updateNews();
  // }
  // const handleNext = async () => {
  //   setPage(page+1)
  //   updateNews();
  // }

  //for infinite scroll
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=c283d4a138244cea88d926c16d6d3f72&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

    return (
      <>
          <h1 className='text-center' style={{marginTop: '90px'}}>Top Headlines - {capitalizeFirstLetter(props.catagory)} </h1>
          {loading && <Spinner/>}

          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length != totalResults}
          loader={<Spinner/>}
          >
            <div className="container">
          <div className="row my-3">
            {articles.map((element) => {
              return <div className="col-md-4 my-3" key = {element.url}>
              <NewsItem title = {element.title?element.title:" "} description = {element.description?element.description:" "} imageUrl = {element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt}/>
              </div>
            })}
            </div>
            </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
            <button type="button" 
           disabled={page <=1} className="btn btn-danger" onClick={handlePrev}>&larr; Previous</button>
            <button type="button" disabled={page +1 > Math.ceil(totalResults/props.pageSize)} className="btn btn-danger" onClick={handleNext}>Next &rarr;</button>
            </div> */}
      </>
    )
  
}

News.defaultProps = {
  country : 'in',
  catagory : 'general',
  pageSize : 8
}

News.propTypes = {
  country : PropTypes.string,
  catagory: PropTypes.string,
  pageSize : PropTypes.number
}

export default News
