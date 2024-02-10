import { useEffect, useState } from "react";

function Categories({setCategory, setPage, setNews}) {

  const categories = [
    "general",
    "science",
    "sports",
    "business",
    "health",
    "entertainment",
    "tech",
    "politics",
    "food",
    "travel"
  ]

  const [toggleBtns, setToggleBtns] = useState([]);

  useEffect(() => {
    fillBtns();
  }, []);

  const fillBtns = () => {
    const temp = []
    for (let i=0, n=categories.length; i < n; i++) {
      temp.push({
        "value": categories[i], 
        "selected": false
      });
    }

    temp[0].selected = true;
    setToggleBtns(temp);
  }

  const categoryBtnHandler = (position) => {
    if (toggleBtns[position].selected === true) {
      return;
    }

    const updated = toggleBtns.map((item, index) => {
      if (index === position) {
        return {
          "value": item["value"],
          "selected": true
        };
      } else {
        return {
          "value": item["value"],
          "selected": false
        };
      }
    });

    window.scrollTo(0, 0);
    setPage(1);
    setNews([]);
    setCategory(toggleBtns[position]["value"]);
    setToggleBtns(updated);
  }

  return (
    <>
    {toggleBtns &&
      <>
      {toggleBtns.map((category, index) => (
        <button className={category.selected ? "selected": ""} key={category.value} value={category.value} onClick={() => categoryBtnHandler(index)}>
          {category.value}
        </button>
      ))}
      </>
    }
    </>
  )
}

export default Categories