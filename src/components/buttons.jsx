import './buttons.css';

export const Signinbutton = ({Signin}) => {
    
    return(
        <button
            className='Signin' 
            onClick={Signin}
        > Check In</button>       
    )
}


export const Signoutbutton = ({Signout}) => {
    
    return(
        <button 
            className='Signout' 
            onClick={Signout}
        > Check Out</button>       
    )
}


export const Popupbtn = ({action}) => {
    
    return(
        <button 
            className='Signout' 
            onClick={action}
        > Select Action</button>       
    )
}