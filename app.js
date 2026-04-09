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
            const img = boton.getAttribute("data-img"); // 🔥 NUEVO

            //AGREGAR IMAGEN AL CARRITO
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>
                    <img src="${img}" style="width:50px; height:50px; object-fit:cover; border-radius:8px;">
                </td>
                <td>${nombre}</td>
                <td style="text-decoration: line-through; color:red;">Q.${original}</td>
                <td style="color:green; font-weight:bold;">Q.${precio}</td>
                <td>
                    <button class="btn-eliminar">Eliminar</button>
                </td>
            `;

            // ELIMINAR PRODUCTO
            fila.querySelector(".btn-eliminar").addEventListener("click", () => {
                lista.removeChild(fila);
                total -= precio;
                totalElemento.textContent = total;

                actualizarEstadoBoton();
            });

            lista.appendChild(fila);

            total += precio;
            totalElemento.textContent = total;

            actualizarEstadoBoton();

            // 🔥 ALERTA BONITA
            Swal.fire({
                icon: 'success',
                title: 'Agregado al carrito 🛒',
                text: nombre,
                timer: 1200,
                showConfirmButton: false
            });

        });
    });

    //  CONFIRMAR COMPRA
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