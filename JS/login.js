
const { createApp } = Vue

createApp ({
    data() {

        return {
            login: false,
            nombreUsuario: ""
        }
    },

    methods: {

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
    }

}).mount('#app');