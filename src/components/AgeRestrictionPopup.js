import {useContext} from "react";
import isAdultContext from "../../utils/isAdultContext";

const AgeRestrictionPopup=()=>{

    const {isAdult, setIsAdult}= useContext(isAdultContext);

  return (
    <div className="restriction-container">
      <h1 className="restriction-heading">You are not 18+, you cannot edit.</h1>
      <div className="confirm-btn">
        <button className="confirm-cancel" onClick={()=>setIsAdult(!isAdult)}>OKAY</button>
      </div>
    </div>
  )
}

export default AgeRestrictionPopup;