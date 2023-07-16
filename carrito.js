//CONTENIDO DE CARRITO
let carrito =JSON.parse(localStorage.getItem('carrito'))|| [];
console.table(carrito);
let tablacompra = document.getElementById('tablaCarro');

function carritoLocalStorage() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
      carrito = carritoGuardado;
      carrito.forEach(producto => {
        tablacompra.innerHTML += `
          <tr data-id="${producto.id}">
            <th scope="row">${producto.id}</th>
            <td>${producto.titulo}</td>                        
            <td>$${producto.precio}</td>
            <th><button type="button" class="btn-close delete" onclick="eliminarProducto(${producto.id})" aria-label="Close"></button></th>
          </tr>
        `;
      });
      // Recalcular el total
      let total = carrito.reduce((ac, prod) => ac + prod.precio, 0);
      document.getElementById('totalProd').innerText = `TOTAL $:${total}`;
    }
  }
  
carritoLocalStorage();
//BOTONES A ASIGNAR (CARRO)
let btnFinalizar = document.getElementById('btnFinalizar');//BOTON FINALIZAR COMPRA
 
function agregarCarrito(producto) {
    carrito.push(producto);
    console.table(carrito);
    // TABLA DEL CARRITO
    const fila = document.createElement("tr");
    fila.setAttribute("data-id", producto.id);
    fila.innerHTML = `
      <th scope="row">${producto.id}</th>
      <td>${producto.titulo}</td>                        
      <td>$${producto.precio}</td>
      <th><i class="fi fi-br-cross" onclick="eliminarProducto(${producto.id})"></i></th> 
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
    tablacompra.appendChild(fila);
     //CALCULAR TOTAL
     let total = carrito.reduce((ac,prod)=> ac + prod.precio,0);
     document.getElementById('totalProd').innerText = `TOTAL $:${total}`;
     localStorage.setItem("carrito",JSON.stringify(carrito));
     localStorage.setItem('Monto total $',JSON.stringify(total));
  }
  
function eliminarProducto(id) {
    // Buscar la fila correspondiente al producto con el id dado
    const filaEliminar = document.querySelector(`tr[data-id="${id}"]`);
    if (filaEliminar) {
      // Eliminar la fila del DOM
      filaEliminar.remove();
      // Filtrar el carrito para eliminar el producto con el id correspondiente
      carrito = carrito.filter(producto => producto.id !== id);
      console.table(carrito);
    }
    // Recalcular el total
    let total = carrito.reduce((ac, prod) => ac + prod.precio, 0);
    document.getElementById('totalProd').innerText = `TOTAL $:${total}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem('Monto total $', JSON.stringify(total));
    //SWEET ALERT
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Producto Borrado'
      })
     
  }
  
function renderizarCarrito() {
    // Limpiar la tabla del carrito
    tablacompra.innerHTML = "";
    // Volver a generar la tabla con los productos actualizados en el carrito
    carrito.forEach(producto => {
      const fila = document.createElement("tr");
      fila.setAttribute("data-id", producto.id);
      fila.innerHTML = `
        <th scope="row">${producto.id}</th>
        <td>${producto.titulo}</td>                        
        <td>$${producto.precio}</td>
        <th><button onclick="eliminarProducto(${producto.id})">x</button></th> 
      `;
      tablacompra.appendChild(fila);
    });
  }



//FINALIZAR COMPRA
btnFinalizar.addEventListener('click',finalizarCarrito);
function finalizarCarrito(){
    
    tablacompra.innerHTML = '';
    // Actualiza el total del carrito en el DOM
    document.getElementById('totalProd').innerText = 'TOTAL $: 0';
    
    // Elimina los datos del carrito del localStorage
    localStorage.removeItem('carrito');
    localStorage.removeItem('Monto total $'); 
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
    localStorage.removeItem('carrito');
    localStorage.removeItem('Monto total $'); 
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


