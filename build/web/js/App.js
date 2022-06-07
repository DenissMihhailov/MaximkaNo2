import {authModule} from './AuthModule.js';
import {home} from './Home.js';
import {loginModule} from './LoginModule.js';
import {adminModule} from './AdminModule.js';
import {listsModule} from './ListsModule.js';
import {profileModule} from './ProfileModule.js';

export{checkMenuPanel};

document.getElementById('logIn').onclick=function(){
    authModule.printLoginForm();
    toogleMenuActive('logIn');
}
//document.getElementById('logOut').onclick=function(){
    //toogleMenuActive('logOut');
//}
document.getElementById('catalog').onclick=function(){
    listsModule.getSneakersList();
    toogleMenuActive('catalog');
}

document.getElementById('admin').onclick=function(){
    adminModule.printAdminChooseFunction();
    toogleMenuActive('admin');
}

document.getElementById('profile').onclick=function(){
    //loginModule.sendLogout();
    let id = sessionStorage.getItem('userId');
    profileModule.getBuyersList(id);
    toogleMenuActive('profile');
}

document.getElementById('home').onclick=function(){
    toogleMenuActive('home');
    home.printHomeForm();
}

    

function toogleMenuActive(elementId){
    let activeElement = document.getElementById(elementId);
    let passiveElements = document.getElementsByClassName("nav__links");
    for (let i = 0; i < passiveElements.length; i++) {
        if (activeElement === passiveElements[i]) {
            passiveElements[i].classList.add("activ");
            passiveElements[i].classList.remove("underlineHover");
        } else {
            if(passiveElements[i].classList.contains("activ")){
                passiveElements[i].classList.remove("activ");
                passiveElements[i].classList.add("underlineHover");
            }
        }
    }
}

function checkMenuPanel(){
    let role = sessionStorage.getItem('role');
    if(role===null){
        if(!document.getElementById('catalog').classList.contains("d-none")){
            document.getElementById('catalog').classList.add("d-none");
        }
        if(!document.getElementById('admin').classList.contains("d-none")){
            document.getElementById('admin').classList.add("d-none");
        }
        if(!document.getElementById('profile').classList.contains("d-none")){
            document.getElementById('profile').classList.add("d-none");
        }
        if(!document.getElementById('logIn').classList.contains("d-none")){
            document.getElementById("logIn").classList.remove("d-none");//Показать вход
        }
        return;
    }
    role = JSON.parse(role);
    if(role.roleName === 'USER'){
        if(!document.getElementById('catalog').classList.contains("d-none")){
            document.getElementById('catalog').classList.remove("d-none");
        }
        if(!document.getElementById('admin').classList.contains("d-none")){
            document.getElementById('admin').classList.add("d-none");
        }
        if(!document.getElementById('profile').classList.contains("d-none")){
            document.getElementById('profile').classList.remove("d-none");
        }
        if(!document.getElementById('logIn').classList.contains("d-none")){
            document.getElementById("logIn").classList.add("d-none");//Скрыть вход
        }
        return;
    }
    if(role.roleName === 'ADMINISTRATOR'){
        if(!document.getElementById('catalog').classList.contains("d-none")){
            document.getElementById('catalog').classList.add("d-none");
        }
        if(!document.getElementById('admin').classList.contains("d-none")){
            document.getElementById('admin').classList.remove("d-none");
        }
        if(!document.getElementById('profile').classList.contains("d-none")){
            document.getElementById('profile').classList.remove("d-none");
        }
        if(!document.getElementById('logIn').classList.contains("d-none")){
            document.getElementById("logIn").classList.add("d-none");//Показать вход
        }
        return;
    }
}
checkMenuPanel();

