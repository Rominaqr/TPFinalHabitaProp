
console.log(location.search)
var id = location.search.substring(4) // de la url obtengo el id
console.log(id)

if (id == "") {
    edit = false;
} else {
    edit = true;
}

const { createApp } = Vue

createApp({
    data() {

        return {
            geturl: "https://rominalauraq.pythonanywhere.com/propiedades",
            updateurl: "https://rominalauraq.pythonanywhere.com/propiedades/" + id,
            error: false,
            editar: edit,
            cargando: true,
            datos: [],
            tipo_propiedad: "",
            ubicacion: "",
            superficie: 0,
            ambiente: 0,
            banio: 0,
            dormitorio: 0,
            cochera: 0,
            antiguedad: "",
            tipo_anunciante: "",
            tipo_venta: "",
            url_imagen: "",
            moneda: "",
            importe: 0,
            login: false,
            nombreUsuario: ""
        }
    },

    methods: {

        async getData(url) {
            const response = await fetch(url);
            const data = await response.json();
            this.datos = data;
        },


        fetchData(url) {

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id = data.id
                    this.tipo_propiedad = data.tipo_propiedad
                    this.ubicacion = data.ubicacion
                    this.superficie = data.superficie
                    this.ambiente = data.ambiente
                    this.banio = data.banio
                    this.dormitorio = data.dormitorio
                    this.cochera = data.cochera
                    this.antiguedad = data.antiguedad
                    this.tipo_anunciante = data.tipo_anunciante
                    this.tipo_venta = data.tipo_venta
                    this.url_imagen = data.url_imagen
                    this.moneda = data.moneda
                    this.importe = data.importe
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },


        guardar() {

            let propiedad = {
                tipo_propiedad: this.tipo_propiedad,
                ubicacion: this.ubicacion,
                superficie: this.superficie,
                ambiente: this.ambiente,
                banio: this.banio,
                dormitorio: this.dormitorio,
                cochera: this.cochera,
                antiguedad: this.antiguedad,
                tipo_anunciante: this.tipo_anunciante,
                tipo_venta: this.tipo_venta,
                url_imagen: this.url_imagen,
                moneda: this.moneda,
                importe: this.importe
            }

            var options = {
                body: JSON.stringify(propiedad),
                method: "POST",
                headers: { "Content-Type": "application/json" },
                redirect: "follow"
            }

            fetch(this.geturl, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./publicar.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al grabar")
                })

        },

        modificar() {
            let propiedad = {
                tipo_propiedad: this.tipo_propiedad,
                ubicacion: this.ubicacion,
                superficie: this.superficie,
                ambiente: this.ambiente,
                banio: this.banio,
                dormitorio: this.dormitorio,
                cochera: this.cochera,
                antiguedad: this.antiguedad,
                tipo_anunciante: this.tipo_anunciante,
                tipo_venta: this.tipo_venta,
                url_imagen: this.url_imagen,
                moneda: this.moneda,
                importe: this.importe
            }
            var options = {
                body: JSON.stringify(propiedad),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.updateurl, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./ConsultaPropiedad.html";          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        },

        eliminar(id) {

            const url = this.geturl+'/' + id;

            var options = {
                method: 'DELETE',
            }

            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json 
                })
        },

        cargar(){            
            this.login = localStorage.getItem('login');
            this.nombreUsuario = localStorage.getItem('usuario');
            console.log(this.login);
        },

        logout() {
            this.login = false;
            this.nombreUsuario = "";
            localStorage.removeItem('login');
            localStorage.removeItem('usuario');
        }

    },

    created() {
        this.cargar();
        this.getData(this.geturl);
        this.fetchData(this.updateurl);
    }


}).mount('#app')