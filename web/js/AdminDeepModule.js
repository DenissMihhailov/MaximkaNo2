import {adminModule} from './AdminModule.js';

class AdminDeepModule{
    createNewSneaker(){
        const firm = document.getElementById('firm').value;
        const model = document.getElementById('model').value;
        const size = document.getElementById('size').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        
        const newSneaker = {
            "firm": firm,
            "model": model,
            "size": size,
            "price": price,
            "description": description,
        }
        const promise = fetch('createNewSneaker',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body: JSON.stringify(newSneaker) 
        });
        promise.then(response => response.json())
               .then(response =>{
                   if(response.status){
                       document.getElementById('error').innerHTML = response.info;
                   }else{
                       document.getElementById('error').innerHTML = response.info;
                       //firstname = response.firstname;
                       //lastname = response.lastname;
                       //birthYear = response.birthYear;
                   }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера: '+error;
                });
    }
    
    getSneakers(){
        let promiseSneaker = fetch('getSneakers',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
        });
        promiseSneaker.then(response => response.json())
                    .then(response => {
                        if(response.status){
                            adminDeepModule.insertSelectSneakers(response.sneaker);
                        }else{
                            document.getElementById('info').innerHTML = 'Список кроссовок пуст';
                        }
                    })
                    .catch(error =>{
                       document.getElementById('info').innerHTML = 'Ошибка сервера (getSneakers): '+error
                        
                    })
    }
    insertSelectSneakers(sneaker){
        const listSneakers = document.getElementById('listSneakers');
        listSneakers.options.length = 0;
        const infoOpt = document.createElement('option');
        infoOpt.disabled = true; infoOpt.selected = true;
        infoOpt.value = 0;
        infoOpt.text = "Выберите кроссовки";
        listSneakers.add(infoOpt);
        for(let i=0; i < sneaker.length; i++){
            const option = document.createElement('option');
            option.value = sneaker[i].id;
            option.text = sneaker[i].sneakerFirm + " " + sneaker[i].sneakerModel;
            listSneakers.add(option);
        };
    }
    setQuantity(){
        const sneakerId = document.getElementById('listSneakers').value;
        const quantity = document.getElementById('quantity').value;
        const newQuantity = {
            "sneakerId": sneakerId,
            "quantity": quantity
        };
        let setQuantityPromise = fetch('setQuantity',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(newQuantity)
        });
        setQuantityPromise.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('error').innerHTML = response.info;
                              }else{
                                  document.getElementById('error').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = 'Ошибка сервера (setNewRole): '+error
                      
                          });
        }
    setLink(){
        const sneakerId = document.getElementById('listSneakers').value;
        const link = document.getElementById('link').value;
        const newLink = {
            "sneakerId": sneakerId,
            "link": link
        };
        let setQuantityPromise = fetch('setLink',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(newLink)
        });
        setQuantityPromise.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('error').innerHTML = response.info;
                              }else{
                                  document.getElementById('error').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = 'Ошибка сервера (setNewRole): '+error
                      
                          });
        }
         getRoles(){
        let pormiseRoles = fetch('getRoles',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
        });
        pormiseRoles.then(response => response.json())
                    .then(response => {
                        if(response.status){
                            adminDeepModule.insertSelectRoles(response.roles)
                        }else{
                            document.getElementById('error').innerHTML = 'Список ролей пуст';
                        }
                    })
                    .catch(error =>{
                       document.getElementById('info').innerHTML = 'Ошибка сервера (getRoles): '+error
                        
                    })
    }
        getUsersMap(){
            let promiseUsersMap = fetch('getUsersMap',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset:utf8'
                },
                credentials: 'include',
            });
            promiseUsersMap.then(response => response.json())
                           .then(response => {
                               if(response.status){
                                   adminDeepModule.insertSelectUsers(response.usersMap);
                               }else{
                                   document.getElementById('error').innerHTML = 'Список пользователей пуст';
                               }
                           })
                           .catch(error => {
                               document.getElementById('info').innerHTML = 'Ошибка сервера (getUsersMap): '+error
                           });

        }
        insertSelectUsers(usersMap){
        const select_users = document.getElementById('select_users');
        select_users.options.length = 0;
        const infoOpt = document.createElement('option');
        infoOpt.disabled = true; infoOpt.selected = true;
        infoOpt.value = 0;
        infoOpt.text = "Выберите пользователя";
        select_users.add(infoOpt);
        for(let i=0; i < usersMap.length; i++){
            const option = document.createElement('option');
            option.value = usersMap[i].user.id;
            option.text = `${usersMap[i].user.login}: ${usersMap[i].role}`;
            select_users.add(option);
        }
    };
        insertSelectRoles(roles){
            const select_roles = document.getElementById('select_roles');
            select_roles.options.length = 0;
            const infoOpt = document.createElement('option');
            infoOpt.disabled = true; infoOpt.selected = true;
            infoOpt.value = 0;
            infoOpt.text = "Выберите роль";
            select_roles.add(infoOpt);
            for(let i=0; i < roles.length; i++){
                const option = document.createElement('option');
                option.value = roles[i].id;
                option.text = roles[i].roleName;
                select_roles.add(option);
            };
        }
        setNewRole(){
        const userId = document.getElementById('select_users').value;
        const roleId = document.getElementById('select_roles').value;
        const newUserRole = {
            "userId": userId,
            "roleId": roleId
        };
        let promiseSetUserRole = fetch('setUserRole',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(newUserRole)
        });
        promiseSetUserRole.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                   document.getElementById('error').innerHTML = response.info;
                                   adminDeepModule.getUsersMap();
                                   adminDeepModule.getRoles();
                               }else{
                                   document.getElementById('error').innerHTML = response.info;
                               }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = 'Ошибка сервера (setNewRole): '+error
                          });
        
        }
}

const adminDeepModule = new AdminDeepModule();
export {adminDeepModule};
