import {useContext} from "react";
import popupContext from "../../utils/popupContext";
import userContext from "../../utils/userContext";

const DeletePopup=({userid})=>{

  const {isPopupOn,setIsPopupOn} = useContext(popupContext);
  const {userData, setUserData,filteredUsers,setFilteredUsers}= useContext(userContext);

  function deleteData(userid){
   return  userData.filter((user,index)=>{
         return user.id===userid ? userData.splice(index,1) : user;
     })
    
 }

  return (
    <div className="popup-container">
      <h1 className="popup-heading">Are you sure you want to delete?</h1>
      <div className="confirm-btn">
        <button className="confirm-cancel" onClick={()=>setIsPopupOn(!isPopupOn)}>CANCEL</button>
        <button className="confirm-delete" onClick={()=>{setIsPopupOn(!isPopupOn);deleteData(userid); setFilteredUsers(userData)}}>DELETE</button>
      </div>
    </div>
  )
}

export default DeletePopup;