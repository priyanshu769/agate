import React from 'react'
import './UserOptions.css'

export const UserOptions = (props) => {
    return (
        <div className={props.userFeat ? 'userOptionsList' : 'userOptionsHidden'}>
        <div className='closeOptions' onClick={props.hideList}></div>
            <div className='userOptionsList'>
                {props.loggedIn && <button className='optionBtn'>{props.userName}</button>}
                {!props.loggedIn && <button className='optionBtn' onClick={props.loginBtnClick}>Login</button>}
                {props.loggedIn && <button className='optionBtn' onClick={props.logoutBtnClick}>Logout</button>}
            </div>
        </div>
    )
}
