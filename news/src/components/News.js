import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react";


function News({ news, savedNews, setSavedNews }) {

  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (savedNews.has(news.uuid)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [navigate]);

  const saveBtnHandler = () => {
    const temp = new Set(savedNews);
    if (savedNews.has(news.uuid)) {
      temp.delete(news.uuid);
      setIsSaved(false);
    } else {
      temp.add(news.uuid);
      setIsSaved(true);
    }

    setSavedNews(temp);
  }

  const similarBtnHandler = () => {
    navigate(`/similar/${news.uuid}`);
  }

  const newsOnClick = () => {
    window.location.href = news.url;
  }

  return (
    <div className="news-backing">
      <div className="news-whole-body" onClick={newsOnClick}>
        <h2>{news.title}</h2>
        <p>{news.description}</p>
        <div className="news-container">
          <img className="preview-img" src={news.image_url}/>
          <div className="news-body">
            <p><strong>Snippet:</strong> {news.snippet}</p>
            <p className="extra-info">
              <strong>published:</strong> {news.published_at} &nbsp;
              <strong>source:</strong> <Link className="reg-link" to={"https://www." + news.source}>{news.source}</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="news-interactions-container">
        <button onClick={saveBtnHandler}>
          {!isSaved &&<p>Save</p>}
          {isSaved &&<p>Unsave</p>}
        </button>
        {/* <GetSimilarBtn uuid={news.uuid} setNews={setMoreNews} infiniteScrolling={infiniteScrolling} setInfiniteScrolling={setInfiniteScrolling} setIsLoading={setIsLoading} page={page} setPage={setPage}/> */}
        <button onClick={similarBtnHandler}>
          Get Similar News
        </button>
      </div>
    </div>
  )
}

export default News