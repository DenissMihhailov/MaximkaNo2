import {authModule} from './AuthModule.js';
import {adminDeepModule} from './AdminDeepModule.js';
import {listsModule} from './ListsModule.js';

function toogleMenuActive(elementId){
    let activeElement = document.getElementById(elementId);
    let passiveElements = document.getElementsByClassName("nav-link");
    for (let i = 0; i < passiveElements.length; i++) {
        if (activeElement === passiveElements[i]) {
            passiveElements[i].classList.add("activeAdmin");
        } else {
            if(passiveElements[i].classList.contains("activeAdmin")){
                passiveElements[i].classList.remove("activeAdmin");
            }
        }
    }
}

class AdminModule{
    printAdminChooseFunction(){
        document.getElementById('content').innerHTML =
        `
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <a class="nav-link" id="addSneaker">Добавить обувь</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="setQuantity">Сделать поступление</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="setLink">Загрузить обложку</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="getUsers">Покупатели</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="getIncome">Доход</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="changeRole">Поменять роль</a>
          </li>
        </ul>
        <div id="contentAdmin"> 
    `
        const addSneaker = document.getElementById('addSneaker');
        addSneaker.addEventListener('click', (e)=>{
            e.preventDefault();
            adminModule.printAddSneaker();
            toogleMenuActive('addSneaker');
        })
        const setQuantity = document.getElementById('setQuantity');
        setQuantity.addEventListener('click', (e)=>{
            e.preventDefault();
            adminModule.printSetQuantity(adminDeepModule.getSneakers());
            toogleMenuActive('setQuantity');
        })
        const changeRole = document.getElementById('changeRole');
        changeRole.addEventListener('click', (e)=>{
            e.preventDefault();
            adminModule.printChangeRole(adminDeepModule.getUsersMap(), adminDeepModule.getRoles());
            toogleMenuActive('changeRole');
        })
        const setLink = document.getElementById('setLink');
        setLink.addEventListener('click', (e)=>{
            e.preventDefault();
            adminModule.printSetImg(adminDeepModule.getSneakers());
            toogleMenuActive('setLink');
        })
        const getUsers = document.getElementById('getUsers');
        getUsers.addEventListener('click', (e)=>{
            e.preventDefault();
            listsModule.getBuyersList();
            toogleMenuActive('getUsers');
        })
        const getIncome = document.getElementById('getIncome');
        getIncome.addEventListener('click', (e)=>{
            e.preventDefault();
            adminModule.printGetIncome();
            toogleMenuActive('getIncome');
        })
      
    }
    
    
    printAddSneaker(){
        document.getElementById('contentAdmin').innerHTML =
                `
                   
        <i id="back"></i>
        <center><p id="error">&nbsp;</p></center>
        <section class="vh-50">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <center><div class="col-12 col-md-8 col-lg-6 col-xl-5" style="">
            <div class="card shadow-2-strong " style="border-radius: 1rem; width: 100%">
              <div class="card-body p-4 text-center">
                <h3 class="mb-4">Добавить обувь</h3>
                <form id="newSneakerForm">
                <div class="form-outline mb-4">
                  <input id="firm" type="text" placeholder="Фирма" class="form-control" />
                </div>      
                <div class="form-outline mb-4">
                  <input id="model" type="text" placeholder="Модель" class="form-control" />
                </div>      
                <div class="form-outline mb-4">
                  <input id="size" type="number" placeholder="Размер" class="form-control" />
                </div>      
                <div class="form-outline mb-4">
                  <input id="price" type="number" step="0,01" placeholder="Цена" class="form-control" />
                </div>      
                <div class="form-outline mb-4">
                  <textarea id="description" type="text" placeholder="Описание" class="form-control"></textarea>
                </div>        
                <button id="submitNewSneaker" style="width: 150px;" type="button" class="btn btn-sm shadow-none text-light">Добавить</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>   
        
            `;
        document.getElementById('submitNewSneaker').addEventListener('click',(e)=>{
            e.preventDefault();
            adminDeepModule.createNewSneaker();
        });
        document.getElementById('back').onclick=function(){
        adminModule.printAdminChooseFunction();}
    }
    printSetQuantity(){
        document.getElementById('contentAdmin').innerHTML =
                `
             <i id="back"></i>
            <center><p id="error">&nbsp;</p></center>
            <section class="vh-50">
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <center><div class="col-12 col-md-8 col-lg-6 col-xl-5" style="">
                <div class="card shadow-2-strong " style="border-radius: 1rem; width: 100%">
                  <div class="card-body p-4 text-center">
                    <h3 class="mb-4">Сделать поступление</h3>
                    <form id="newSneakerForm">
                    <div class="form-outline mb-4">
                      <select id="listSneakers" type="text" name="sneaker" class="fadeIn second"></select>
                    </div>      
                    <div class="form-outline mb-4">
                      <input id="quantity" type="number" placeholder="Введите количество" class="form-control" />
                    </div>      
                    <button id="submitAddQuantity" style="width: 150px;" type="button" class="btn btn-sm shadow-none text-light">Отправить</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>   
            `;
        document.getElementById('back').onclick=function(){
        adminModule.printAdminChooseFunction();
    }
        document.getElementById('submitAddQuantity').addEventListener('click',(e)=>{
            e.preventDefault();
            adminDeepModule.setQuantity();
        });
    }
    printSetImg(){
        document.getElementById('contentAdmin').innerHTML =
                `
                <i id="back"></i>
                <center><p id="error">&nbsp;</p></center>
                <section class="vh-50">
              <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <center><div class="col-12 col-md-8 col-lg-6 col-xl-5" style="">
                    <div class="card shadow-2-strong " style="border-radius: 1rem; width: 100%">
                      <div class="card-body p-4 text-center">
                        <h3 class="mb-4">Загрузить фото</h3>
                        <form id="newSneakerForm">
                        <div class="form-outline mb-4">
                          <select id="listSneakers" type="text" name="sneaker" class="fadeIn second"></select>
                        </div>      
                        <div class="form-outline mb-4">
                          <input id="link" type="text" placeholder="Введите ссылку" class="form-control" />
                        </div>      
                        <button id="submitAddLink" style="width: 150px;" type="button" class="btn btn-sm shadow-none text-light">Загрузить</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> 
                
            `;
        document.getElementById('back').onclick=function(){
        adminModule.printAdminChooseFunction();
    }
        document.getElementById('submitAddLink').addEventListener('click',(e)=>{
            e.preventDefault();
            adminDeepModule.setLink();
        });
    }
    printGetIncome(){
        document.getElementById('contentAdmin').innerHTML =
                `
                <i id="back"></i>
                <center><p id="error">&nbsp;</p></center>
                <section class="vh-50">
              <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <center><div class="col-12 col-md-8 col-lg-6 col-xl-5" style="">
                    <div class="card shadow-2-strong " style="border-radius: 1rem; width: 100%">
                      <div class="card-body p-4 text-center">
                        <h3 class="mb-4">Доход магазина</h3>
                        <form id="newSneakerForm">
                        <div class="form-outline mb-4">
                          <select id="listMonth" type="text" name="sneaker" class="fadeIn second">
                          <option value="1">1. Январь</option> <option value="2">2. Февраль</option>
                          <option value="3">3. Март</option> <option value="4">4. Апрель</option>
                          <option value="5">5. Май</option> <option value="6">6. Июнь</option>
                          <option value="7">7. Июль</option> <option value="8">8. Август</option>
                          <option value="9">9. Сентябрь</option> <option value="10">10. Октябрь</option>
                          <option value="11">11. Ноябрь</option> <option value="12">12. Декабрь</option>
                          </select>
                        </div>      
                        <div class="form-outline mb-4">
                          <input id="link" type="number" placeholder="Введите год" class="form-control" />
                        </div>      
                        <button id="submitGetIncome" style="width: 150px;" type="button" class="btn btn-sm shadow-none text-light">Вывести</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            `;
        document.getElementById('back').onclick=function(){
        adminModule.printAdminChooseFunction();
    }
    }
    printChangeRole(){
        document.getElementById('contentAdmin').innerHTML =
                `
                
        
        
                <i id="back"></i>
                <center><p id="error">&nbsp;</p></center>
                <section class="vh-50">
              <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <center><div class="col-12 col-md-8 col-lg-6 col-xl-5" style="">
                    <div class="card shadow-2-strong " style="border-radius: 1rem; width: 100%">
                      <div class="card-body p-4 text-center">
                        <h3 class="mb-4">Поменять роль</h3>
                        <form id="newSneakerForm">
                        <div class="form-outline mb-4">
                          <select id="select_users" type="text" name="sneaker">
                        </select>
                        </div>      
                        <div class="form-outline mb-4">
                          <select id="select_roles" type="text" name="sneaker">
                        </select>
                        </div>      
                        <button id="submitChangeRole" style="width: 150px;" type="button" class="btn btn-sm shadow-none text-light">Поменять роль</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            `;
        document.getElementById('back').onclick=function(){
        adminModule.printAdminChooseFunction();
    }
        document.getElementById('submitChangeRole').addEventListener('click',(e)=>{
            e.preventDefault();
            adminDeepModule.setNewRole();
        });
    }
    
    } 

const adminModule = new AdminModule();
export {adminModule};

