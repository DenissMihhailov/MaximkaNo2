import {loginModule} from './LoginModule.js';
import {listsModule} from './ListsModule.js';

class ProfileModule{   
    getBuyersList(authId){
        let promiseSneaker = fetch('getBuyers',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
        });
        promiseSneaker.then(response => response.json())
                    .then(response => {
                        if(response.status){
                            profileModule.insertAuthBuyer(response.buyer, authId);
                        }else{
                            document.getElementById('info').innerHTML = 'Список покупателей пуст';
                        }
                    })
                    .catch(error =>{
                       document.getElementById('info').innerHTML = 'Ошибка сервера (getBuyers): '+error
                        
                    })
    }
    insertAuthBuyer(buyer, authId){
        document.getElementById('content').innerHTML =
                `
                  <div id="containerProfile" class="containerProfile">
                  
                </div>
                `;
        const cards = document.getElementById('containerProfile');
            cards.insertAdjacentHTML('afterbegin',
            `
              <section>
                <center><p id="infoLog" style="margin-bottom: 2px" class="text-success">&nbsp;</p></center>
                <div class="row">
                  <div class="col-lg-4">
                    <div class="card mb-4" style="width: 80%; margin-left: 68px; height: 393px">
                      <div class="card-body text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" class="rounded-circle img-fluid" style="width: 113px;">
                        <h5 class="my-3">${buyer[authId-1].firstName} ${buyer[authId-1].lastName}</h5>
                        <p class="my-3 ">${buyer[authId-1].login}</p>
                        <p class="text-muted mb-1">${buyer[authId-1].phone}</p>
                        <p class="text-muted mb-4">Баланс €${buyer[authId-1].money}</p>
                        <div class="d-flex justify-content-center mb-2">
                          <button id="submitChangeData" style="width: 200px;" type="button" class="btn btn-sm shadow-none text-light">Сохранить изменения</button>
                          <button id="logOut" style="width: 100px;" type="button" class="btn btn-sm shadow-none text-light">Выйти</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-8">
                      <div class="card mb-4" style="width: 90%">
                      <div class="card-body">
                            <form>
                        <div class="row text-center">
                            <div class="col-sm-12" style="margin-bottom: 12px;">
                            <p class="mb-0" style="margin-top: -8px;">Редактировать профиль</p>
                          </div>   
                        </div>
                        <div class="row">
                          <div class="col-sm-3">
                            <p class="mb-0">Имя</p>
                          </div>
                          <div class="col-sm-9">
                           <input type="text" id="newName" value="${buyer[authId-1].firstName}" class="text-muted mb-0"/>
                          </div>
                        </div>
                        <hr>
                        <div class="row">
                          <div class="col-sm-3">
                            <p class="mb-0">Фамилия</p>
                          </div>
                          <div class="col-sm-9">
                            <input type="text" id="newLastName" value="${buyer[authId-1].lastName}" class="text-muted mb-0"/>
                          </div>
                        </div>
                        <hr>
                        <div class="row">
                          <div class="col-sm-3">
                            <p class="mb-0">Телефон</p>
                          </div>
                          <div class="col-sm-9">
                            <input type="text" id="newPhone" value="${buyer[authId-1].phone}" class="text-muted mb-0"/>
                          </div>
                        </div>
                        <hr>
                        <div class="row">
                          <div class="col-sm-3">
                            <p class="mb-0">Баланс</p>
                          </div>
                          <div class="col-sm-9">
                              <input type="number" step="0.01" id="newMoney" value="${buyer[authId-1].money}" class="text-muted mb-0"/>
                          </div>
                        </div>
                        <hr>
                        <div class="row">
                          <div class="col-sm-12">
                            <center><p class="mb-0"><a class="btn btn-secondary btn-sm" id="newPassword" style="color: white !important; border-color: #30cf25;">Сменить пароль</a></p></center>                        
                          </div>
                        </div>
                        <hr>
                        <div class="row">
                          <div class="col-sm-12">
                            <center><p class="mb-0"><a class="btn btn-secondary btn-sm" id="pur" style="color: white !important; border-color: #30cf25;">Покупки</a></p></center>
                          </div>
                        </div>
                        <input type="submit" name="send" id="send" hidden/>
                            </form>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>
        <style>
            .btn{
                width: auto;
                border: none !important;
            }
            .btn:hover{
                background-color: #30cf25 !important;
            }

            input, textarea {
            outline: none;
            border: none;
            }
        </style>
            `         
            );
            document.getElementById('logOut').onclick=function(){
            loginModule.sendLogout();
            }
            document.getElementById('newPassword').onclick=function(){
            profileModule.newPassword();
            }
            document.getElementById('pur').onclick=function(){
            listsModule.getSoldSneakersList();
            }
            function updatede() {
                let id = sessionStorage.getItem('userId');
                profileModule.getBuyersList(id);
            }
            document.getElementById('submitChangeData').onclick=function(){
            profileModule.updateUserData();
            setTimeout(updatede, 10);

            }
    }
    
    updateUserData(){
        const newName = document.getElementById('newName').value;
        const newLastName = document.getElementById('newLastName').value;
        const newPhone = document.getElementById('newPhone').value;
        const newMoney = document.getElementById('newMoney').value;
        let authId = sessionStorage.getItem('userId');
        
        const newData = {
            "newName": newName,
            "newLastName": newLastName,
            "newPhone": newPhone,
            "newMoney": newMoney,
            "authId": authId,
        }
        const promise = fetch('updateUserData',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body: JSON.stringify(newData) 
        });
        promise.then(response => response.json())
               .then(response =>{
                   if(response.status){
                       document.getElementById('infoLog').innerHTML = response.info;
                   }else{
                       document.getElementById('infoLog').innerHTML = response.info;
                   }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера: '+error;
                });
    }
    newPassword(){
                document.getElementById('content').innerHTML =
                `
                  <div id="containerProfile" class="containerProfile">
                  
                </div>
                `;
        const cards = document.getElementById('containerProfile');
            cards.insertAdjacentHTML('afterbegin',
            `
              <i id="back"></i>
                <center><p id="error">&nbsp;</p></center>
                <section class="vh-50">
              <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <center><div class="col-12 col-md-8 col-lg-6 col-xl-5" style="">
                    <div class="card shadow-2-strong " style="border-radius: 1rem; width: 100%">
                      <div class="card-body p-4 text-center">
                        <h3 class="mb-4">Поменять пароль</h3>
                        <form>
                        <div class="form-outline mb-4">
                          <input id="oldPassword" type="password" placeholder="Старый пароль" class="form-control" />
                        </div>      
                        <div class="form-outline mb-4">
                          <input id="newPassword1" type="password" placeholder="Новый пароль" class="form-control" />
                        </div>      
                        <div class="form-outline mb-4">
                          <input id="newPassword2" type="password" placeholder="Повторите новый пароль" class="form-control" />
                        </div>          
                        <button id="newPass" style="width: 150px;" type="button" class="btn btn-sm shadow-none text-light">Сменить пароль</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            `         
            );
            document.getElementById('newPass').onclick=function(){
            profileModule.updatePassword();
            }

    }
    updatePassword(){
        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword1 = document.getElementById('newPassword1').value;
        const newPassword2 = document.getElementById('newPassword2').value;
        let authId = sessionStorage.getItem('userId');      
        const newPass = {
            "oldPassword": oldPassword,
            "newPassword1": newPassword1,
            "newPassword2": newPassword2 ,
            "authId": authId,
        }
        const promise = fetch('updatePassword',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body: JSON.stringify(newPass) 
        });
        promise.then(response => response.json())
               .then(response =>{
                   if(response.status){
                       document.getElementById('error').innerHTML = response.info;
                       loginModule.sendLogout();
                   }else{
                       document.getElementById('error').innerHTML = response.info;
                   }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера: '+error;
                });
    }
}

const profileModule = new ProfileModule();
export {profileModule};

