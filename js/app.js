let carritoDeCompras = []

const contenedorComponentes = document.getElementById('contenedor-componentes');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonFinalizar = document.getElementById('finalizar')
const finCompra = document.getElementById('fin-compra')

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const seleccionarComponentes = document.getElementById('seleccionarComponentes')
const buscador = document.getElementById('search')



//filtrar componentes - no funciona cuando quiero cambiar de categoría (preguntar) ya que solo muestra en la solapa "todos" pero no en las siguientes
seleccionarComponentes.addEventListener('change',()=>{
    console.log(seleccionarComponentes.value);
    if(seleccionarComponentes.value === 'todo'){
        mostrarProductos(stockProductos)
    }else{
        let arrayNuevo = stockProductos.filter(elemento => elemento.tipo === seleccionarComponentes.value)
        mostrarProductos(arrayNuevo)
    }
})
mostrarProductos(stockProductos)

//logica de mi pagina
function mostrarProductos(array){

    contenedorComponentes.innerHTML = ""

    array.forEach(el => {
    let div = document.createElement('div')
    div.className = 'componente'
    div.innerHTML= `<div class="card">
                    <div class="card-image">
                        <img src="${el.img}">
                        <span class="card-title">${el.nombre}</span>
                        <a id="boton${el.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
                    </div>
                    <div class="card-content">
                        <p>Tipo: ${el.tipo}</p>
                        <p> $${el.precio}</p>
                    </div>
                </div> `

    contenedorComponentes.appendChild(div)
    
    let btnAgregar = document.getElementById(`boton${el.id}`)
    btnAgregar.addEventListener('click',()=>{
        agregarAlCarrito(el.id);
    })

})


}

function agregarAlCarrito(id) {
    let componenteAgregar = stockProductos.find(obj=> obj.id === id)
    carritoDeCompras.push(componenteAgregar)
    mostrarCarrito(componenteAgregar)
    actualizarCarrito()
}

function mostrarCarrito(componenteAgregar) {

    let div = document.createElement('div')
    div.setAttribute('class', 'componenteEnCarrito')
    div.innerHTML=`<p>${componenteAgregar.nombre}</p>
                    <p>Precio: $${componenteAgregar.precio}</p>
                    <button id="eliminar${componenteAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
    contenedorCarrito.appendChild(div)

    let btnEliminar = document.getElementById(`eliminar${componenteAgregar.id}`)
    btnEliminar.addEventListener('click',()=>{
        btnEliminar.parentElement.remove()
        carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id !== componenteAgregar.id)
        console.log(carritoDeCompras);
        actualizarCarrito()
    })
}


function  actualizarCarrito (){
    contadorCarrito.innerText = carritoDeCompras.length
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + el.precio, 0 )   //acumulador     
}     