import News from "./News";

function NewsList({newsList, savedNews, setSavedNews}) {

  return (
    <>
      {newsList.map(news => (
        <News news={news} key={news.uuid} savedNews={savedNews} setSavedNews={setSavedNews}/>
      ))}
    </>
  )
}

export default NewsList