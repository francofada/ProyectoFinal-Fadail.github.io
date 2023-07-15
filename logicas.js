function mostrarProductosAlmacen() {
    productosMostrados.innerHTML = '';
  
    let productosAlmacen = productosAComprar.filter((producto) => {
      return producto.categoria === 'Almacen';
    });
  
    // Crear y mostrar tarjetas de productos para los productos filtrados de almacen
    for (const producto of productosAlmacen) {
      let carta = document.createElement('div');
      carta.className = 'hola card col-md-4';
      carta.innerHTML = `
        <div class="chau card">
          <img class="card-img-top" src="${producto.imagen}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <h6 class="card-title">${producto.marca}</h6>
            <p class="card-text">${producto.precio}</p>
            <button class="btn btn-primary comprar-btn">Comprar</button>
          </div>
        </div>
      `;
      productosMostrados.appendChild(carta);
  
      let comprar = carta.querySelector('.comprar-btn');
  
      comprar.addEventListener('click', () => {
        carrito.push({
          nombre: producto.nombre,
          marca: producto.marca,
          precio: producto.precio,
        });
        console.log(carrito);
      });
    }
  }
  
  let almacenButton = document.getElementById('Almacen');
  almacenButton.addEventListener('click', mostrarProductosAlmacen);