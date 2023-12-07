
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
            url: "https://rominalauraq.pythonanywhere.com/usuario",
            error: false,
            editar: edit,
            cargando: true,
            datos: [],
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            login: false,
            nombreUsuario: ""
        }
    },

    methods: {

        cargar() {
            this.login = localStorage.getItem('login');
            this.nombreUsuario = localStorage.getItem('usuario');
            console.log(this.login);
        },

        logout() {
            this.login = false;
            this.nombreUsuario = "";
            localStorage.removeItem('login');
            localStorage.removeItem('usuario');
        },

        guardar() {

            let usuario = {
                nombre: this.nombre,
                apellido: this.apellido,
                email: this.email,
                password: this.password
            }

            var options = {
                body: JSON.stringify(usuario),
                method: "POST",
                headers: { "Content-Type": "application/json" },
                redirect: "follow"
            }

            fetch(this.url, options)
                .then(function () {
                    alert("Registrado correctamente")
                    window.location.href = "./index.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al guardar")
                })

        },

        async loginUsuario() {
            
            const respuesta = await fetch(this.url + "/" + this.email);
            const dato = await respuesta.json();
            this.datos = dato;
            if (this.datos.password == this.password) {

                localStorage.setItem('login', 'true');
                localStorage.setItem('usuario', this.datos.nombre);

                window.location.href = "./index.html"
            } else {
                alert("Password incorrecta")
                window.location.href = "./login.html"
            }


        }


    },

    created() {

       this.cargar()

    }


}).mount('#app')