class Home{ 
    printHomeForm(){
        document.getElementById('content').innerHTML =
    `
    <center><a style="color: black">Вас приветсвует начальная страница приложения JSBootsStore</a></center>
`
       ;
    }
    }
let home = new Home (); 
export { home };



