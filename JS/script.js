/* 

Declaración de variables iniciales:

°cantidadNoticias: Cantidad de noticias que se cargarán cada vez que se presione el botón "Ver más".

°pageFinal y pageInicial: Se utilizan para rastrear las páginas de noticias que se están mostrando.

°temaActual: Almacena el tema actual de noticias.

*/

let cantidadNoticias = 5;
let pageFinal = cantidadNoticias;
let pageInicial = 0;
let temaActual = "General";

/* 

Objeto noticias:

°Contiene métodos para buscar y mostrar noticias.

°fetchNoticias(categoria) realiza una solicitud a la API de NewsAPI para buscar noticias en una categoría 
específica y luego llama al método displayNoticias(data) para mostrar las noticias.

°El método displayNoticias(data) se encarga de mostrar las noticias en el documento HTML. Elimina las noticias 
anteriores si se ha seleccionado un nuevo tema, recorre los artículos de la respuesta de la API y crea 
elementos HTML para cada noticia, incluyendo el título, imagen, fecha, fuente y un enlace al artículo completo. 
También agrega un botón "Ver más" al final de las noticias.

*/

let noticias = {
    "apiKey":"b2a6ecd96f3f4618bdd0929136e0d459",
    fetchNoticias:function(categoria){
        fetch(
            "https://newsapi.org/v2/everything?q="
            +categoria+
            "&languaje=es&apiKey="+this.apiKey
        )
        .then((response)=>response.json())
        .then((data)=>this.displayNoticias(data));
    },
    displayNoticias: function(data){

        //elimina todo si ha seleccionado un nuevo tema

        if(pageInicial==0){
            document.querySelector(".container-noticias").textContent ="";
        }

        for(i=pageInicial;i<=pageFinal;i++){
            const {title} = data.articles[i];
            let h2 = document.createElement("h2");
            h2.textContent = title;
    
            const {urlToImage} = data.articles[i];
            let img = document.createElement("img");
            img.setAttribute("src", urlToImage);

            let info_item = document.createElement("div");
            info_item.className = "info_item";
            const {publishedAt} = data.articles[i];
            let fecha = document.createElement("span");
            let date = publishedAt;
            date=date.split("T")[0].split("-").reverse().join("-");
            fecha.className = "fecha";
            fecha.textContent = date;

            const {name} = data.articles[i].source;
            let fuente = document.createElement("span");
            fuente.className = "fuente";
            fuente.textContent = name;

            info_item.appendChild(fecha);
            info_item.appendChild(fuente);

            const {url} = data.articles[i];

            let item = document.createElement("div");
            item.className = "item";
            item.appendChild(h2);
            item.appendChild(img);
            item.appendChild(info_item);
            item.setAttribute("onclick", "location.href='"+url+"'");
            document.querySelector(".container-noticias").appendChild(item);
        }

        let btnSiguiente = document.createElement("span");
        btnSiguiente.id = "btnSiguiente";
        btnSiguiente.textContent = "Ver más";
        btnSiguiente.setAttribute("onclick","siguiente()");
        document.querySelector(".container-noticias").appendChild(btnSiguiente);
    }
}

/*

Funciones:

°buscar(cat): Se llama cuando se selecciona una categoría de noticias. Establece las variables pageInicial, 
pageFinal y temaActual, y luego llama a noticias.

°fetchNoticias(cat) para cargar las noticias de la categoría seleccionada.
buscarTema(): Se llama cuando se realiza una búsqueda de noticias por un tema específico. Establece las variables 
pageInicial, pageFinal y temaActual, y luego llama a noticias.fetchNoticias(temaActual) para cargar las noticias 
del tema ingresado.

°siguiente(): Se llama cuando se presiona el botón "Ver más". Incrementa las variables pageInicial y pageFinal
para cargar la siguiente página de noticias y luego llama a noticias.fetchNoticias(temaActual) para cargar más 
noticias.


*/

function buscar(cat){
    pageInicial = 0;
    pageFinal = cantidadNoticias;
    temaActual = cat;
    noticias.fetchNoticias(cat);
}


function siguiente(){
    pageInicial = pageFinal + 1;
    pageFinal = pageFinal + cantidadNoticias + 1;
    document.querySelector("#btnSiguiente").remove();
    noticias.fetchNoticias(temaActual);
}

noticias.fetchNoticias(temaActual);