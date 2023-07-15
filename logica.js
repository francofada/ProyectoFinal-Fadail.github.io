//CONTENIDO DE CARRITO
const carrito =JSON.parse(localStorage.getItem('carrito'))|| [];
console.table(carrito);
let tablacompra = document.getElementById('tablaCarro');

//BOTONES A ASIGNAR (CARRO)
let btnFinalizar = document.getElementById('btnFinalizar');//BOTON FINALIZAR COMPRA
let btnDesc = document.getElementById('btnDesc');//BOTON DESCUENTO

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
listaInicio(productos);
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
console.log(precioMax);
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
        console.table(productosMaximos);
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
   

//AGREGAR CARRO
function agregarCarrito(producto){
    carrito.push(producto);
    //TABLA DEL CARRITO
    tablacompra.innerHTML += `
    <tr>
        <th scope="row">${producto.id}</th>
        <td>${producto.titulo}</td>                        
        <td>$${producto.precio}</td>
        <th><button type="button" class="btn-close delete-product"  aria-label="Close"></button></th>
    </tr>
  
    `;
    //SWEET ALERT
    Swal.fire({
        title: `Agregaste ${producto.titulo} al carrito`,
        text:  `MONTO A PAGAR $${producto.precio}`,
        imageUrl: producto.foto,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: producto.titulo,
      })

    //CALCULAR TOTAL
    let total = carrito.reduce((ac,prod)=> ac + prod.precio,0);
    document.getElementById('totalProd').innerText = `TOTAL $:${total}`;
    localStorage.setItem("carrito",JSON.stringify(carrito));
    localStorage.setItem('Monto total $',JSON.stringify(total));
   
}


//FINALIZAR COMPRA
btnFinalizar.addEventListener('click',finalizarCarrito);
function finalizarCarrito(){
    tablacompra.innerHTML = '';
    // Actualiza el total del carrito en el DOM
    document.getElementById('totalProd').innerText = 'TOTAL $: 0';
    
    // Elimina los datos del carrito del localStorage
    localStorage.clear('carrito');
    localStorage.clear('Monto total $'); 
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Gracias por su compra'
      })
}
//VACIAR CARRO
let btnVaciar = document.getElementById('btnVacio');//BOTON VACIAR CARRO
function vaciarCarrito() {
    tablacompra.innerHTML = '';
    // Actualiza el total del carrito en el DOM
    document.getElementById('totalProd').innerText = 'TOTAL $: 0';
    
    // Elimina los datos del carrito del localStorage
    localStorage.clear('carrito');
    localStorage.clear('Monto total $'); 
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Vaciado'
      })}
btnVaciar.addEventListener('click',vaciarCarrito);
