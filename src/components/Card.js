import { useState,useContext} from "react";
import userContext from "../../utils/userContext";
import {IMG_DROP_DOWN_URL,IMG_DROP_UP_URL,IMG_DELETE_ICON_URL,IMG_EDIT_ICON_URL,IMG_CANCEL_ICON_URL,IMG_SAVE_ICON_URL} from "../../Config";
import DeletePopup from "./DeletePopup";
import popupContext from "../../utils/popupContext";
import isAdultContext from "../../utils/isAdultContext";
import AgeRestrictionPopup from "./AgeRestrictionPopup";
import { enableBodyScroll, disableBodyScroll } from "../../utils/scrollingFunction";


const Card= ({user,isVisible,setIsVisible})=>{

const {userData, setUserData,filteredUsers,setFilteredUsers}= useContext(userContext);

const [isEditable, setIsEditable] = useState(false);
const [isChanged, setIsChanged]= useState(false);
const [hasChanged, setHasChanged]= useState(false);
const [ age,setAge]= useState(calculateAge(user.dob))

const [editedUser, setEditedUser] = useState({
    dob: calculateAge(user.dob),
    gender: user.gender,
    country: user.country,
    description: user.description,
  });

const {isPopupOn,setIsPopupOn} = useContext(popupContext);
const {isAdult,setIsAdult} = useContext(isAdultContext);

    // function to calculate age
    function calculateAge(dob){
        const today= new Date();
        const birthdate= new Date(dob);
        const age= today.getFullYear()- birthdate.getFullYear();
        
        return age;
    }


    const handleAgeChange = (e) => {
        const inputValue = parseInt(e.target.value);
      
        if (!isNaN(inputValue)) {
          setAge(inputValue);
          setIsChanged(true);
        } else {
          setAge(age);
        }
      };
      
      const handleGenderChange = (e) => {
        setEditedUser({
          ...editedUser,
          gender: e.target.value,
        });
        setIsChanged(true);
      };
     
      const handleCountryChange = (e) => {
        const inputValue = e.target.value;
      
        if (inputValue.trim() !== '') {
          setEditedUser({
            ...editedUser,
            [e.target.name]: inputValue,
          });
          setIsChanged(true);
        } else {
          setEditedUser({
            ...editedUser,
            [e.target.name]: user.country,
          });
        }
      };

    const handleDescriptionChange = (e) => {
        const description = e.target.value;
      
        if (description.trim() !== '') {
          setEditedUser((prevUser) => ({ ...prevUser, description }));
          setIsChanged(true);
        } else {
          setEditedUser((prevUser) => ({ ...prevUser, description: user.description }));
        }
      };

      const handleSave = () => {
        if (isChanged) {
          const updatedUsers = userData.map((u) =>
            u.id === user.id
              ? {
                  ...u,
                  age: age,
                  gender: editedUser.gender,
                  country: editedUser.country,
                  description: editedUser.description,
                }
              : u
          );
      
          setUserData(updatedUsers);
          setFilteredUsers(updatedUsers);
          setHasChanged(false);
        }
      
        setIsEditable(false);
        setIsChanged(false);
      };

      const handleCancel = () => {

       !hasChanged? setEditedUser({
          dob: calculateAge(user.dob),
          gender: user.gender,
          country: user.country,
          description: user.description,
        }):""
        setIsEditable(false);
        setIsChanged(false);
        setHasChanged(false)
      };

      function ageValidation(dob){
        if(calculateAge(dob)<18){
            setIsEditable(false)
            setIsAdult(true);
        } else{
            setIsEditable(true)
        }
      }

    return(
        <div className="card-container ">
            <div className="card-header">
                <div className="card-header-left">
                <img className="profile-pic" src={user.picture}/>
                <h1 className="user-name">{user.first + " "+user.last}</h1>
                </div>
                {
                    (!isVisible) ?
                    <button className="btn" onClick={()=>{setIsVisible(true);setIsAdult(false);setIsPopupOn(false)}}><img className="drop-down" src={IMG_DROP_DOWN_URL}/></button>:
                <button className="btn" onClick={()=>setIsVisible(false)}><img className="drop-up" src={IMG_DROP_UP_URL}/></button>
               }
            </div>
            {/* card details */}
            <div className={(isVisible )?"accordian-container": "accordian-container-hide"}>
            {
                isPopupOn? <DeletePopup userid={user.id}/>  : ""
            }
            {
                isAdult? <AgeRestrictionPopup/> : ""
            }
            {
                isPopupOn || isAdult ? disableBodyScroll():enableBodyScroll()
            }
            
            <div className="accordian-first" >
                <div className="age-div">
                    <label>Age</label>
                    <input type="number" className={isEditable ? 'age-edit' : 'age-read-only'}  value={age} readOnly={!isEditable} onChange={handleAgeChange} />
                </div>
                <div className="gender-div">
                    <label>Gender</label>
                    {!isEditable ? (
                    <input defaultValue={editedUser.gender} className="gender-read-only" readOnly={true} />
                    ) : (
                    <select className={isEditable ? 'gender-edit' : 'gender-read-only'} defaultValue={editedUser.gender} readOnly={!isEditable} onChange={handleGenderChange}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Transgender</option>
                        <option>Rather not say</option>
                        <option>Other</option>
                    </select>
                    )}
                    
                </div>
                <div className="country-div">
                    <label>Country</label>
                    <input className={isEditable ? 'country-edit' : 'country-read-only'} defaultValue={!isEditable ? user.country : editedUser.country} readOnly={!isEditable} onChange={handleCountryChange} />
                </div>
            </div>
            <div className="accordian-second">
                <label>Description</label>
                <textarea className={isEditable?"edit-testfield":"read-textfield"} type="text" defaultValue={!hasChanged?user.description:editedUser.description } readOnly={!isEditable} onChange={handleDescriptionChange} />
            </div>
            { !isEditable?
            <div className="edit-delete-btn">
            <button className="edit-btn" onClick={()=>{setIsPopupOn(true)}}><img className="delete" src={IMG_DELETE_ICON_URL}/></button>

            <button className="edit-btn" onClick={()=>{ageValidation(user.dob)}}><img className="edit" src={IMG_EDIT_ICON_URL}/></button> 
        </div> : 
        <div className="edit-delete-btn">
            <button className="edit-btn" onClick={()=>{handleCancel()}}><img className="cancel" src={IMG_CANCEL_ICON_URL}/></button>

            <button className={(isChanged && isEditable) ? 'edit-btn' : 'edit-hidden'} onClick={() => {
            setIsEditable(false);setIsChanged(false); handleSave()}}><img className="edit" src={IMG_SAVE_ICON_URL}/></button>
        </div>
}
        </div>
        </div>
    )
}

export default Card;
