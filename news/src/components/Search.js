import { useState } from "react";

function Search({search, setSearch, setPage, setNews}) {

  const [text, setText] = useState();

  const submitHandler = (e) => {
    if (text === search) {
      window.scrollTo(0, 0);
      return;
    }
    e.preventDefault();
    window.scrollTo(0, 0);
    setPage(1);
    setNews([]);
    setSearch(text);
  }

  const textHandler = (e) => {
    setText(e.target.value);
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="text" onChange={textHandler} value={text}/>
      <input type="submit" value="Search"/>
    </form>
  )
}

export default Search