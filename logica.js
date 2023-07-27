
jsonProds()
let productos;
//OBTENCION DE JSON
async function jsonProds(){
    const URLJSON = 'productos.json';
    const respuesta = await fetch(URLJSON);
    const datos = await respuesta.json();
    productos = datos;
    listaInicio(productos);

    
    
// OBTENCION DE PRECIOS MAXIMOS
// OBTENCION DE BOTONES
const buscarBtn = document.getElementById('buscarBtn');
const precioMaximoInput = document.getElementById('precioMaximo');

//FILTRADO DE PRECIOS
function precioFiltrado(precio){
    const filtrados = productos.filter((prod)=>prod.precio <= precio);
    return filtrados;
}
//OBTENCION DE PRECIOS MAXIMO
const precios = productos.map(producto => producto.precio);
const precioMax = Math.max(...precios);
console.log("Producto maximo: "+precioMax);
//FUNCION BUSCAR PRECIO
buscarBtn.addEventListener('click', function() {
// Obtiene el valor del campo de entrada de texto

 const precioMaximoLocal = parseFloat(precioMaximoInput.value);

//VERIFICAR LOS PRECIOS CORRESPONDIENTES
  if (isNaN(precioMaximoLocal)|| precioMaximoLocal<0 ||precioMaximoLocal>precioMax) {
    Swal.fire({
        icon: 'error',
        title: 'PRECIO MAXIMO $249000' ,
        text: 'INGRESE NUEVAMENTE EL MONTO',
      })
    }
    else {
        const productosMaximos = precioFiltrado(precioMaximoLocal);
        console.log("Producto maximo: "+productosMaximos);
        listaInicio(productosMaximos);
    }
  }
);
//FUNCION REINICIAR (BUSCAR PRECIO)
const borrarBtn = document.getElementById('borrarBtn');
function reiniciarFuncion(){
    precioMaximoInput.value = '';
    listaInicio(productos);
}
borrarBtn.addEventListener('click', reiniciarFuncion);

    //ACCESO A FILTROS - MAYOR A MENOR - MAXIMO PRECIO
let btnOpciones = document.getElementById('opciones');
//FUNCION OPCION MENOR A MAYOR (PRECIOS)
function ordenarMenorAMayor(){
    productos.sort((a,b)=> a.precio - b.precio);
    console.table(productos);
}
function ordenarMayorAMenor(){
    productos.sort((a,b)=> b.precio - a.precio);
    console.table(productos);
}
function ordenarAlfabeta(){
    productos.sort((a, b) => {
        if(a.titulo < b.titulo) { return -1; }
        return 0;
    });
    console.table(productos);
}

//ACCIONAR FUNCION DE OPCCION
btnOpciones.addEventListener("change", accionarOpcion);
function accionarOpcion(){
    console.log("Evento AccionarOpcion disparado");
    const opcionSeleccionada = btnOpciones.value;

    if (opcionSeleccionada === "opcion2") {
        ordenarMenorAMayor();
        listaInicio(productos);
    } 
    else if(opcionSeleccionada === "opcion3"){
        ordenarMayorAMenor();
        listaInicio(productos);
    }
    else if(opcionSeleccionada === "opcion1"){
        ordenarAlfabeta()
        listaInicio(productos);
        
    }

}

//FUNCION BOTON COMPRAR (AGREGA AL CARRO) 
function compraBoton(){
    let btnCompra = document.getElementsByClassName('compra');
        for(const boton of btnCompra){
            boton.addEventListener('click',()=>{
                const prodACarro = productos.find((producto)=>producto.id == boton.id);
                agregarCarrito(prodACarro);
            })
            
            boton.onmouseover = ()=>{
                boton.classList.replace('btn-outline-warning','btn-warning');
            }
            boton.onmouseout = ()=>{
                boton.classList.replace('btn-warning','btn-outline-warning');
            }
        }
}
}
//CONTENIDO DE PRODUCTOS
let contenidoProductos = document.getElementById('cartasProd');

//BOTONES A ASIGNAR (NAVEGADOR)
let btnTienda = document.getElementById('btnTienda');//BOTON TIENDA
let btnJuegos = document.getElementById('btnJuegos');//BOTON JUEGOS
let btnAcces = document.getElementById('btnAcces');//BOTON ACCESORIOS
let btnGift = document.getElementById('btnGift');//BOTON GIFT CARDS


//MENU-----START
//PRODCUCTOS EN EL INICIO
function listaInicio(listaDeInicio){
    //CONTENEDOR VACIO
        contenidoProductos.innerHTML='';
    //LISTA DE CARDS
        for(const prodInicio of listaDeInicio){
            contenidoProductos.innerHTML+=`
                <div class="card col-sm-3">
                    <img class="card-img-top" src=${prodInicio.foto} alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${prodInicio.titulo}</h5>
                        <p class="card-text">$ ${prodInicio.precio}</p>
                        <button id=${prodInicio.id} class="btn btn-outline-warning compra">Comprar</button>
                    </div>
                </div>
            `;
        }
        let btnCompra = document.getElementsByClassName('compra');
    //EVENTO BOTONES COMPRAR
        compraBoton(btnCompra);
        
            
    }
//PRODCUCTOS EN TIENDA (LO MISMO QUE INICIO)
btnTienda.addEventListener("click",function(){
    //LIMPIAR EL CONTENIDO DE PRODUCTOS
    contenidoProductos.innerHTML=``;
    //CREAR Y AÑADIR LOS PRODUCTOS FILTRADOS DE LA LISTA
    //LISTA DE CARDS
    for(const prodTienda of productos){
        contenidoProductos.innerHTML+=`
            <div class="card col-sm-3">
                <img class="card-img-top" src=${prodTienda.foto} alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${prodTienda.titulo}</h5>
                    <p class="card-text">$ ${prodTienda.precio}</p>
                    <button id=${prodTienda.id} class="btn btn-outline-warning compra">Comprar</button>
                </div>
            </div>
        `;
    }
    let btnCompra = document.getElementsByClassName('compra');
    compraBoton(btnCompra);
})

//PRODCUCTOS EN JUEGOS
btnJuegos.addEventListener("click",function(){
    //FILTRO DE CATEGORIA "JUEGOS"
    const productosJuegos = productos.filter(game=>game.categoria ==="Juegos");
    //LIMPIAR EL CONTENIDO DE PRODUCTOS
    contenidoProductos.innerHTML=``;
    //CREAR Y AÑADIR LOS PRODUCTOS FILTRADOS DE LA LISTA
    productosJuegos.forEach(producto =>{
        contenidoProductos.innerHTML+=`
                <div class="card col-sm-3">
                    <img class="card-img-top" src=${producto.foto} alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text">$ ${producto.precio}</p>
                        <button id=${producto.id} class="btn btn-outline-warning compra">Comprar</button>
                    </div>
                </div>
            `; 
            let btnCompra = document.getElementsByClassName('compra');
            compraBoton(btnCompra);
    })
    
})

//PRODCUCTOS EN ACCESORIOS
btnAcces.addEventListener("click",function(){
    //FILTRO DE CATEGORIA "JUEGOS"
    const productosAccesorios = productos.filter(game=>game.categoria ==="Accesorio");
    //LIMPIAR EL CONTENIDO DE PRODUCTOS
    contenidoProductos.innerHTML=``;
    //CREAR Y AÑADIR LOS PRODUCTOS FILTRADOS DE LA LISTA
    productosAccesorios.forEach(producto =>{
        contenidoProductos.innerHTML+=`
                <div class="card col-sm-3">
                    <img class="card-img-top" src=${producto.foto} alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text">$ ${producto.precio}</p>
                        <button id=${producto.id} class="btn btn-outline-warning compra">Comprar</button>
                    </div>
                </div>
            `; 
            let btnCompra = document.getElementsByClassName('compra');
            compraBoton(btnCompra);
    })
})

//PRODUCTOS EN GIFT CARD
btnGift.addEventListener("click",function(){
    //FILTRO DE CATEGORIA "JUEGOS"
    const productosGift = productos.filter(game=>game.categoria ==="GiftCards");
    //LIMPIAR EL CONTENIDO DE PRODUCTOS
    contenidoProductos.innerHTML=``;
    //CREAR Y AÑADIR LOS PRODUCTOS FILTRADOS DE LA LISTA
    productosGift.forEach(producto =>{
        contenidoProductos.innerHTML+=`
                <div class="card col-sm-3">
                    <img class="card-img-top" src=${producto.foto} alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text">$ ${producto.precio}</p>
                        <button id=${producto.id} class="btn btn-outline-warning compra">Comprar</button>
                    </div>
                </div>
            `; 
            let btnCompra = document.getElementsByClassName('compra');
            compraBoton(btnCompra);
    })
})
//MENU-----END