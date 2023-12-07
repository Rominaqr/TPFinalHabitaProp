const formulario = document.querySelector('.formPublicar');
const btnPublicar = document.querySelector('.btnAnunciar');
if (btnPublicar){
btnPublicar.addEventListener('click', function(event) {

    event.preventDefault();

    const tipoPropiedad = document.getElementById('tipoPropiedad')?.value;
    const ubicacion = document.getElementById('ubicacion')?.value;
    const superficie = document.getElementById('superficie')?.value;
    const ambientes = document.getElementById('ambientes')?.value;
    const banos = document.getElementById('baños')?.value;
    const dormitorios = document.getElementById('dormitorios')?.value;
    const cocheras = document.getElementById('cocheras')?.value;
    const antiguedad = document.querySelector('input[name="antiguedad"]:checked')?.id;
    const tipoAnunciante = document.querySelector('input[name="tipoAnunciante"]:checked')?.id;
    const tipoVenta = document.querySelector('input[name="tipoVenta"]:checked')?.id;
    const precioTipo = document.querySelector('input[name="precioProp"]:checked')?.id;
    const numPrecio = document.getElementById('numPrecio')?.value;

    if (tipoPropiedad && ubicacion && superficie && ambientes && banos && dormitorios && cocheras && antiguedad && tipoAnunciante && tipoVenta && precioTipo && numPrecio) {

        const propiedad = {
            tipoPropiedad,
            ubicacion,
            superficie,
            ambientes,
            banos,
            dormitorios,
            cocheras,
            antiguedad: antiguedad.id,
            tipoAnunciante: tipoAnunciante.id,
            tipoVenta: tipoVenta.id,
            precioTipo: precioTipo.id,
            numPrecio
        };

        localStorage.setItem('propiedad', JSON.stringify(propiedad));

        alert('Propiedad publicada con éxito');

    } else {
        
        alert('Por favor, completa todos los campos del formulario.');
    }
})};
