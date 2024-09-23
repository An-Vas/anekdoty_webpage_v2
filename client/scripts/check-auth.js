
export async function IsUser(){
    const response = await fetch('/api/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            mode: 'no-cors',
        },
    });

    if (response.status == 200) return true;
    else return false ;

}


export async function IsAdmin(){
    const response = await fetch('/api/auth/admin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            mode: 'no-cors',
        },
    });

    if (response.status == 200) return true;
    else return false ;

}


export async function GetUserName(){
    const response = await fetch('/api/auth/get-username', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            mode: 'no-cors',
        },
    });

    const usernameJson = await response.json({});


    return usernameJson.username;

}
