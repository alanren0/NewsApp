import { useNavigate } from "react-router-dom";

function SavedBtn() {
  
  const navigate = useNavigate();

  const btnHandler = () => {
    navigate("/saved");
  }

  return (
    <button onClick={btnHandler}>
      Saved Articles
    </button>
  )
}

export default SavedBtn