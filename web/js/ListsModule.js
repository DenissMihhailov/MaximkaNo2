import {adminModule} from './AdminModule.js';

class ListsModule{
    getSneakersList(){
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
                            listsModule.insertSneakersList(response.sneaker);
                        }else{
                            document.getElementById('info').innerHTML = 'Список кроссовок пуст';
                        }
                    })
                    .catch(error =>{
                       document.getElementById('info').innerHTML = 'Ошибка сервера (getSneakers): '+error
                        
                    })
    }
    insertSneakersList(sneaker){
        document.getElementById('content').innerHTML =
                `
                  <div class="container">
                  <div class="row justify-content-start">
                    <div id="cards" class="row">
                    </div>
            </div>
                `;
        const cards = document.getElementById('cards');
        for (var i = 0, max = sneaker.length; i < max; i++) {
            cards.insertAdjacentHTML('afterbegin',
            `
                <div class="col-3">
                    <div class="card border-0 scale" >
                        <a id="id${sneaker[i].id}"><img src="${sneaker[i].imgLink}" class="card-img-top" alt="..." height="300px"></a>
                        <div class="card-body" style="margin-left: -18px;">
                        <small><p class="card-title" style="margin-top: -12px;">${sneaker[i].sneakerFirm} ${sneaker[i].sneakerModel}</p></small>
                        <small><strong><p class="card-text">€${sneaker[i].sneakerPrice}</p></strong></small>
                        </div>
                    </div>
                </div>

            <style>
               .scale {
                transition: 0.75s; /* Время эффекта */
               }
               .scale:hover {
                transform: scale(1.05); /* Увеличиваем масштаб */
               }
              </style>
            `         
            );
        }
            $(document).on('click', 'a[id^="id"]', function(e) {
            e.preventDefault();
            var id = this.id;
            id = id.replace(/[a-zа-яё]/gi, '');
            listsModule.getSneakerExactly(id);
        });   
    }
    getSneakerExactly(sneakerId){
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
                            listsModule.insertSneakerExactly(response.sneaker, sneakerId);
                        }else{
                            document.getElementById('info').innerHTML = 'Список кроссовок пуст';
                        }
                    })
                    .catch(error =>{
                       document.getElementById('info').innerHTML = 'Ошибка сервера (getSneakers): '+error
                        
                    })
    }
    insertSneakerExactly(sneaker, sneakerId){
        document.getElementById('content').innerHTML =
               ` 
              <container>
                <div class="card mb-3" style="max-width: 890px; max-height: auto">
              <div class="row g-0">
                <div class="col-md-5">
                    <img src="${sneaker[sneakerId-1].imgLink}" class="img" alt="..." height="480px" width="372px">
                </div>
                <div class="col-md-7">
                  <div class="card-body">
                    <h4 class="card-title"><small><font face="monospace">${sneaker[sneakerId-1].sneakerFirm} ${sneaker[sneakerId-1].sneakerModel}</small></h4>
                    <h5 class="card-title" style="margin-bottom: 30px"><font face="franklin gothic medium">€${sneaker[sneakerId-1].sneakerPrice}</font></h5>
                    <p class="card-text" style="margin-bottom: 30px"><small>${sneaker[sneakerId-1].sneakerDescription}</small></p>
                    <p class="card-text"><small>В наличии ${sneaker[sneakerId-1].sneakerQuantity}</small></p>
                    <p class="card-text" style="margin-bottom: 30px"><small>Размер ${sneaker[sneakerId-1].sneakerSize}</small></p>
                    <a id="buy" class="btn btn-success">Купить</a>
                    <p class="card-text"><small id="infoPerchase"></small></p>
                  </div>
                </div>
              </div>
            </div>
            </container>

            <style>
                .card{
                margin-left: auto;
                margin-right: auto;
                }
                .card-body{
                    margin-top: 40px;
                }
                .btn{
                    margin-left: 410px;
                    color: white !important;
                    border: none;
                }
                .btn:hover{
                    background-color: #00e725 !important;
                }
            </style>
                `;  
        document.getElementById('buy').onclick=function(){
        listsModule.perchaseSneaker(sneakerId);
        }
        }
        
    perchaseSneaker(sneakId){
        const buyerId = sessionStorage.getItem('userId');
        const purchase = {
            "sneakId": sneakId,
            "buyerId": buyerId,
        }
        const promise = fetch('purchaseHistory',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body: JSON.stringify(purchase) 
        });
        promise.then(response => response.json())
               .then(response =>{
                   if(response.status){
                       document.getElementById('infoPerchase').innerHTML = response.info;
                   }else{
                       document.getElementById('infoPerchase').innerHTML = response.info;
                   }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера: '+error;
                });
    }   
    getBuyersList(){
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
                            listsModule.insertBuyersList(response.buyer);
                        }else{
                            document.getElementById('info').innerHTML = 'Список покупателей пуст';
                        }
                    })
                    .catch(error =>{
                       document.getElementById('info').innerHTML = 'Ошибка сервера (getBuyers): '+error
                        
                    })
    }
    insertBuyersList(buyer){
        document.getElementById('contentAdmin').innerHTML =
                `
                  <div class="container-table fadeInDown">
                    <ul class="responsive-table">
                      <li class="table-header">
                        <div class="col col-1">User Id</div>
                        <div class="col col-2">Customer Name</div>
                        <div class="col col-3">Balance</div>
                        <div class="col col-4">Phone</div>
                      </li>
                      <div id="tables"></div>
                    </ul>
                  </div>
                `;
        const cards = document.getElementById('tables');
        for (var i = 0, max = buyer.length; i < max; i++) {
            cards.insertAdjacentHTML('afterbegin',
            `
                <li class="table-row">
                   <div class="col-1">${buyer[i].id}</div>
                   <div class="col-2">${buyer[i].firstName} ${buyer[i].lastName} (${buyer[i].login})</div>
                   <div class="col-3">${buyer[i].money}</div>
                   <div class="col-4">${buyer[i].phone}</div>
                </li>
            `         
            );
        }
    }
    getSoldSneakersList(){
        const buyerId = sessionStorage.getItem('userId');
        const id = {
            "buyerId": buyerId,
        }
        
        let promiseSneaker = fetch('getSoldSneakers',{
            method: 'GET', 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(id)

        });
        promiseSneaker.then(response => response.json())
                    .then(response => {
                        if(response.status){
                            listsModule.insertSoldSneakersList(response.sneaker);
                        }else{
                            document.getElementById('info').innerHTML = 'Список кроссовок пуст';
                        }
                    })
                    .catch(error =>{
                       document.getElementById('info').innerHTML = 'Ошибка сервера (getSoldSneakers): '+error     
                    })
    }
    insertSoldSneakersList(sneaker){
        document.getElementById('content').innerHTML =
                `
                  <div class="container-table fadeInDown">
                    <ul class="responsive-table">
                      <li class="table-header">
                        <div class="col col-1">Order Id</div>
                        <div class="col col-2">Product</div>
                        <div class="col col-3">Price</div>
                        <div class="col col-4">Date</div>
                      </li>
                      <div id="tables"></div>
                    </ul>
                  </div>
                `;
        const cards = document.getElementById('tables');
        for (var i = 0, max = sneaker.length; i < max; i++) {
            cards.insertAdjacentHTML('afterbegin',
            `
                <li class="table-row">
                   <div class="col-1">${sneaker[i].id}</div>
                   <div class="col-2">${sneaker[i].sneakerFirm} ${sneaker[i].sneakerModel}</div>
                   <div class="col-3">${sneaker[i].sneakerPrice}</div>
                   <div class="col-4">${sneaker[i].sneakerDate}</div>
                </li>
            `         
            );
        }  
    }
}

const listsModule = new ListsModule();
export {listsModule};
