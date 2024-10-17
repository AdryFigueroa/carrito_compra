

    const productos = [
        { nombre: "Leche", precio: 1000 },
        { nombre: "Pan de Molde", precio: 2000 },
        { nombre: "Queso", precio: 1200 },
        { nombre: "Mermelada", precio: 890 },
        { nombre: "Azúcar", precio: 1300 }
    ];

    let carrito = [];
    let productoActual;

    const cantidadModal = new bootstrap.Modal(document.getElementById('cantidadModal'));
    const confirmacionModal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
    const continuarModal = new bootstrap.Modal(document.getElementById('continuarModal'));
    const totalModal = new bootstrap.Modal(document.getElementById('totalModal'));

    document.querySelectorAll('.agregar-producto').forEach(button => {
        button.addEventListener('click', function() {
            productoActual = productos[this.getAttribute('data-producto') - 1];
            cantidadModal.show();
        });
    });

    document.getElementById('confirmar-cantidad').addEventListener('click', () => {
        const cantidad = parseInt(document.getElementById('cantidad-unidades').value);
        if (cantidad > 0) {
            carrito.push({ ...productoActual, cantidad });
            document.getElementById('producto-agregado').textContent = `${cantidad} ${productoActual.nombre}(s) agregado(s) al carrito.`;
            cantidadModal.hide();
            confirmacionModal.show();
        } else {
            alert('Por favor, ingrese una cantidad válida.');
        }
    });

    document.getElementById('confirmacionModal').addEventListener('hidden.bs.modal', () => {
        continuarModal.show();
    });

    document.getElementById('responder-continuar').addEventListener('click', () => {
        const respuesta = document.getElementById('seguir-agregando').value.toLowerCase();
        if (respuesta === 's') {
            continuarModal.hide();
        } else if (respuesta === 'n') {
            const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
            document.getElementById('total-compra').textContent = `Total de la compra: $${total.toFixed(2)}`;
            continuarModal.hide();
            totalModal.show();
        } else {
            alert('Por favor, ingrese "s" para sí o "n" para no.');
        }
    });

    document.getElementById('totalModal').addEventListener('hidden.bs.modal', () => {
        carrito = [];
    });
