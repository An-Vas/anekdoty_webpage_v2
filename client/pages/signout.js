import React , { useEffect } from "react";

const SignOut = () => {

    useEffect(() => {
        fetch('/signout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                mode: 'no-cors',
            },
            
        })
            
            window.location.assign("/home")
    }, []);


    return (
        <div>
           Выход из аккаунта, минутку...
        </div>
    );
};
 
export default SignOut;