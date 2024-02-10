
function GetNewsBtns({ setNews, type, setType, setPage }) {

  

  const topBtnHandler = () => {
    if (type === "top") {
      return;
    }
    window.scrollTo(0, 0);
    setPage(1);
    setNews([]);
    setType("top");
  }

  const allBtnHandler = () => {
    if (type === "all") {
      return;
    }
    window.scrollTo(0, 0);
    setPage(1);
    setNews([]);
    setType("all");
  }

  return (
    <>
      <button className={type==="top" ? "selected": ""} onClick={topBtnHandler}>Top Stories</button>
      <button className={type==="all" ? "selected": ""} onClick={allBtnHandler}>All News</button>
    </>
  )
}

export default GetNewsBtns


