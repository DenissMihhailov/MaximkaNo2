import {loginModule} from './LoginModule.js';

class AuthModule{ 
    printLoginForm(){
        document.getElementById('content').innerHTML =
    `
        <section class="vh-50">
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <center><div class="col-12 col-md-8 col-lg-6 col-xl-5" style="">
                <div class="card shadow-2-strong " style="border-radius: 1rem; width: 70%">
                  <div class="card-body p-4 text-center">
                    <h3 class="mb-4">Авторизация</h3>
                    <form>
                    <div class="form-outline mb-4">
                      <input type="text" id="login" name="login" placeholder="Логин">
                    </div>
                    <div class="form-outline mb-4">
                      <input type="password" id="password" name="login" placeholder="Пароль">
                    </div>      
                    <div class="form-outline mb-4">
                    <a id="reg" style="color: black !important; cursor: pointer;">Нет аккаунта?</a>
                    </div>
                    <button id="authBtn" type="button" class="btn btn-sm shadow-none text-light ">Войти</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
`
        const authBtn = document.getElementById('authBtn');
        authBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            loginModule.sendCredential();
        })
        
        const reg = document.getElementById('reg');
        reg.addEventListener('click', (e)=>{
            e.preventDefault();
            authModule.printRegestrationForm();
        })
    }
         
    printRegestrationForm(){
        document.getElementById('content').innerHTML =
    `
   
        
        <section class="text-center">
         <center><div class="card mx-4 mx-md-5 shadow-5-strong"
        <div class="card-body py-5 px-md-5" style="border-radius: 1rem; width: 30%">

          <div class="row d-flex justify-content-center">
            <div class="col-8">
              <h3 class="mb-4 mt-3">Регистрация</h3>
              <form>
                <div class="row">
                  <div class="col-md-12 mb-4">
                    <div class="form-outline">
                      <input type="text" id="firstName" class="fadeIn second" name="login" placeholder="Имя">
                    </div>
                  </div>
                  <div class="col-md-12 mb-4">
                    <div class="form-outline">
                        <input type="text" id="lastName" class="fadeIn second" name="login" placeholder="Фамилия">
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 mb-4">
                    <div class="form-outline">
                      <input type="text" id="phone" class="fadeIn second" name="login" placeholder="Телефон">
                    </div>
                  </div>

                <div class="form-outline mb-4">
                  <input type="text" id="login" class="fadeIn second" name="login" placeholder="Логин">
                </div>
                <div class="form-outline mb-4">
                  <input type="password" id="password" class="fadeIn third" name="login" placeholder="Пароль">
                </div>
                <div class="form-outline mb-4">
                  <input type="password" id="passwordcon" class="fadeIn third" name="login" placeholder="Повторите пароль">
                </div>
                <button id="register" type="button" class="btn btn-sm shadow-none text-light">Зарегистрироваться</button>
                </form>
            </div>
          </div>
        </div>
        </div>
        </section>
`
     const register = document.getElementById('register');
        register.addEventListener('click', (e)=>{
            e.preventDefault();
            loginModule.registrationNewUser();
        })
     const log = document.getElementById('log');
        log.addEventListener('click', (e)=>{
            e.preventDefault();
            authModule.printLoginForm();
        })
    }
}
let authModule = new AuthModule (); 
export { authModule };

