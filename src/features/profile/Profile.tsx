import React from 'react'
import {useAppSelector} from "../../app/hooks";
import {EditableSpan} from "./index";

export const Profile = () => {
    const photo = useAppSelector(state => state.profile.photo)
    const userName = useAppSelector(state => state.profile.userName)
    const email = useAppSelector(state => state.profile.email)
    const onClickHandler = () => {
        console.log('Log out')
    }
    const onChangeHandler = () => {
        console.log('Name has been changed')
    }

    return (
        <div style={{width: '200px', height: '200px', border: '1px solid black', textAlign: 'center'}}>
            <div>Personal Information</div>
            <div><img src={photo} alt="photo"/></div>
            <EditableSpan value={userName} onChange={onChangeHandler}/>
            <div>{email}</div>
            <div>
                <button onClick={onClickHandler}>Log out</button>
            </div>
        </div>
    )
}
