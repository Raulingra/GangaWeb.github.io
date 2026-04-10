document.addEventListener("DOMContentLoaded", () => {

    let total = 0;

    const botones = document.querySelectorAll(".btn-comprar");
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    const btnFinal = document.getElementById("btn-comprar-final");

    // CONTROL DEL BOTÓN
    function actualizarEstadoBoton() {
        if (total === 0) {
            btnFinal.disabled = true;
            btnFinal.style.opacity = "0.5";
            btnFinal.textContent = "Carrito vacío";
        } else {
            btnFinal.disabled = false;
            btnFinal.style.opacity = "1";
            btnFinal.textContent = "Confirmar Compra";
        }
    }

    actualizarEstadoBoton();

    // AGREGAR PRODUCTOS
    botones.forEach(boton => {
        boton.addEventListener("click", () => {

            const nombre = boton.getAttribute("data-nombre");
            const precio = parseFloat(boton.getAttribute("data-precio"));
            const original = boton.getAttribute("data-original");
            const img = boton.getAttribute("data-img");

            let cantidad = 1;

            const fila = document.createElement("tr");

            // ✅ UNA SOLA VEZ innerHTML
            fila.innerHTML = `
                <td>
                    <img src="${img}" style="width:50px; height:50px; object-fit:cover; border-radius:8px;">
                </td>
                <td>${nombre}</td>
                <td style="text-decoration: line-through; color:red;">Q.${original}</td>
                <td class="precio">Q.${precio}</td>
                <td>
                    <button class="menos">-</button>
                    <span class="cantidad">1</span>
                    <button class="mas">+</button>
                </td>
                <td class="subtotal">Q.${precio}</td>
                <td>
                    <button class="btn-eliminar">Eliminar</button>
                </td>
            `;

            const btnMas = fila.querySelector(".mas");
            const btnMenos = fila.querySelector(".menos");
            const spanCantidad = fila.querySelector(".cantidad");
            const subtotalElemento = fila.querySelector(".subtotal");

            // ➕ SUMAR
            btnMas.addEventListener("click", () => {
                cantidad++;
                spanCantidad.textContent = cantidad;

                total += precio;
                subtotalElemento.textContent = "Q." + (precio * cantidad);
                totalElemento.textContent = total;

                actualizarEstadoBoton();
            });

            // ➖ RESTAR
            btnMenos.addEventListener("click", () => {
                if (cantidad > 1) {
                    cantidad--;
                    spanCantidad.textContent = cantidad;

                    total -= precio;
                    subtotalElemento.textContent = "Q." + (precio * cantidad);
                    totalElemento.textContent = total;

                    actualizarEstadoBoton();
                }
            });

            // ❌ ELIMINAR (CORREGIDO)
            fila.querySelector(".btn-eliminar").addEventListener("click", () => {
                lista.removeChild(fila);

                total -= (precio * cantidad); // 🔥 ahora sí correcto
                totalElemento.textContent = total;

                actualizarEstadoBoton();
            });

            lista.appendChild(fila);

            total += precio;
            totalElemento.textContent = total;

            actualizarEstadoBoton();

            // ALERTA
            Swal.fire({
                icon: 'success',
                title: 'Agregado al carrito 🛒',
                text: nombre,
                timer: 1200,
                showConfirmButton: false
            });

        });
    });

    // CONFIRMAR COMPRA
    btnFinal.addEventListener("click", () => {

        if (total === 0) return;

        Swal.fire({
            title: '¿Confirmar compra?',
            text: `Total a pagar: Q.${total}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {

            if (result.isConfirmed) {

                lista.innerHTML = "";
                total = 0;
                totalElemento.textContent = total;

                actualizarEstadoBoton();

                Swal.fire({
                    icon: 'success',
                    title: 'Compra realizada ❤️',
                    text: 'Gracias por tu compra'
                });
            }

        });

    });

});