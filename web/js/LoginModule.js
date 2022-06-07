import {authModule} from './AuthModule.js';
import {checkMenuPanel} from './App.js';

class LoginModule{
    sendCredential(){
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const credential = {
        "login": login,
        "password": password
    };
    let promise = fetch('login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset:utf8'
        },
        credentials: 'include',
        body: JSON.stringify(credential)
    });
    promise.then(response=> response.json())
       .then(response =>{
           if(response.auth){
               document.getElementById('info').innerHTML = response.info;
               sessionStorage.setItem('token',JSON.stringify(response.token));
               sessionStorage.setItem('user',JSON.stringify(response.user));
               sessionStorage.setItem('role',JSON.stringify(response.role));
               sessionStorage.setItem('userId',JSON.stringify(response.userId));
               checkMenuPanel();
               location.reload();
               //document.getElementById('content').innerHTML = "";
           }else{
               checkMenuPanel();
               document.getElementById('info').innerHTML = response.info;
           }
       })
       .catch( error =>{
           document.getElementById('info').innerHTML = "Ошибка запроса (sendCredential): "+error
           document.getElementById('content').innerHTML = "";
       });
 }
    sendLogout(){
     let promise = fetch('logout', {
         method: 'GET',
     });
     promise.then(response => response.json())
             .then(response => {
                 if(!response.auth){
                     if(sessionStorage.getItem('token')!== null){
                        sessionStorage.removeItem('token');
                     }
                     if(sessionStorage.getItem('user')!== null){
                        sessionStorage.removeItem('user');
                     }
                     if(sessionStorage.getItem('role')!== null){
                        sessionStorage.removeItem('role');
                     }
                    checkMenuPanel();
                    location.reload();
                    //document.getElementById('info').innerHTML = response.info;
                    //authModule.printLoginForm();
                 }
     })
     
 }
    registrationNewUser(){
     const firstname = document.getElementById('firstName').value;
     const lastname = document.getElementById('lastName').value;
     const phone = document.getElementById('phone').value;
     const login = document.getElementById('login').value;
     const password1 = document.getElementById('password').value;
     const password2 = document.getElementById('passwordcon').value;
     if(password1 !== password2){
         document.getElementById('info').innerHTML = 'Пароли не совпадают';
         return;
     }

     const user = {
         "firstname": firstname,
         "lastname": lastname,
         "phone": phone,
         "login": login,
         "password": password1,
     };
     let promise = fetch('registration',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset:utf8'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    });
    promise.then(respnose => respnose.json())
        .then(response =>{
            if(response.status){
                authModule.printLoginForm()
                document.getElementById('info').innerHTML = response.info;
            }else{
                document.getElementById('info').innerHTML = response.info;
            }
        })
        .catch(error =>{
            document.getElementById('info').innerHTML = "Ошибка запроса (registrationNewUser): "+error;
            document.getElementById('content').innerHTML = "";
        });
 }
}


const loginModule = new LoginModule();
export {loginModule};


