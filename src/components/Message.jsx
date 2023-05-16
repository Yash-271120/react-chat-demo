import React from "react";

const Message = ({
    displayName = "",
    text = "",
    photoURL = "",
    uid = "",
    createdAt = null,
    isImageMessage = false,
    imageUrl = null,
}) => {
    return (
        <div>
            {photoURL ? (
                <img src={photoURL} alt="Avatar" width={45} height={45} style={{float:'left'}}/>
            ) : null}
            {displayName ? <p style={{color:'red', fontWeight:'bold'}}>{displayName}</p> : null}
            {isImageMessage ? (
                <img src={imageUrl} alt="Image" width={200} height={200}  style={{marginTop:'17px'}}/>
            ) : null}
            {text ? <p style={{color:'grey',fontWeight:'bolder'}}>{text}</p> : null}
        </div>
    );
};

export default Message;
