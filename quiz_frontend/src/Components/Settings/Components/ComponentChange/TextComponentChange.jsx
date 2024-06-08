import React, { useContext } from "react";
import { UserContext } from "../../../../App";
import { uploadAvatarClient } from "../../../../docs/api/upload_avatar";
// import { UserContext } from '../../../../App'

const TextComponentChange = (props) => {
  const { user }= useContext(UserContext)
  // const { setuser }= useContext(UserContext)
  const handleFile= async (e)=> {
    const formData= new FormData()
    const file= e.target.files[0]
    if(!file) return  
    formData.append("avatar", file)
    formData.append("uid", user?.uid)
    const data= await uploadAvatarClient(formData)
    props?.setInfoUser((prev)=> ({...prev, photoURL: data?.secure_url}))
  }
  return (
    <>
      {parseInt(props?.type) === 1 && (
        <div className="text-component-change">
          <input type="file" onChange={(e)=> handleFile(e)} />
        </div>
      )}
      {parseInt(props?.type) === 2 && (
        <div className="text-component-change">
          <input
            onChange={(e) =>
              props?.setInfoUser((prev) => ({
                ...prev,
                account_name: e.target.value,
              }))
            }
            type="text"
            placeholder={props?.infoUser?.account_name}
            className="text-input-component-change"
            style={{ fontWeight: 600 }}
          />
        </div>
      )}
      {parseInt(props?.type) === 3 && (
        <div className="text-component-change">
          <input
            onChange={(e) =>
              props?.setInfoUser((prev) => ({
                ...prev,
                displayName: e.target.value,
              }))
            }
            type="text"
            placeholder={props?.infoUser?.displayName}
            className="text-input-component-change"
            style={{ fontWeight: 600 }}
          />
        </div>
      )}
    </>
  );
};

export default TextComponentChange;
