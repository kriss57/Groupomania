<template>
     <div class="container">
        <LoginNav/>
          <div class="card">
            
         <router-view />
          <h1 v-if="mode == 'login'">Se connecter</h1>
          <h1 v-else>S'inscrire</h1>

           <form id="info" @submit="checkForm" action="/something">
             <p v-if="mode == 'login'">
              Pas encore de compte ?
              <span
              ><button class="card_action" v-on:click.prevent="switchCreate()">
                Créer un compte
             </button></span
             >
            </p>

           <p v-if="mode == 'create'">
           Déja un compte ?
          <span
          ><button class="card_action" v-on:click.prevent="switchLogin()">
            Se connecter
          </button></span
           >
         </p>

         <div class="form-group" v-if="mode == 'create'">
            <label for="prenom">Ton prénom</label>
            <input
             v-model.lazy="userData.prenom"
             type="text"
            id="prenom"
            class="form-control"
            />
        <small  class="form-text text-muted"
          >de 3 a 25 caracteres </small
        >
        </div>

        <div class="form-group" v-if="mode == 'create'">
        <label for="nom">Ton nom</label>
        <input
          v-model.lazy="userData.nom"
          type="text"
          id="nom"
          class="form-control"
        />
        <small  class="form-text text-muted"
          >de 3 a 25 caracteres </small
        >
        </div>

        <div class="form-group" v-if="mode == 'create'">
        <label for="pseudo">Ton pseudo</label>
        <input
          v-model.lazy="userData.pseudo"
          type="text"
          id="pseudo"
          class="form-control"
        />
        <small  class="form-text text-muted"
          >de 3 a 25 caracteres</small
        >
        </div>

        <div class="form-group">
        <label for="email">Ton email</label>
        <input
          v-model.lazy="userData.email"
          type="mail"
          id="email"
          class="form-control"
        />
        <small  class="form-text text-muted"
          >ex: john@doe.com</small
        >
        </div>

          <div class="form-group">
           <label for="password">Ton mot de passe</label>
            <input
            required
            v-model.lazy="userData.password"
            type="password"
            id="password"
            autocomplete="on"
            class="form-control"
            />
            <small  class="form-text text-muted"
            >Au moins 1 lettre et 1 chiffre</small
             >
           </div>

          <button
           v-if="mode == 'login'"
            v-on:click.prevent="login"
            class="btn btn-secondary"
          >
           Connexion
           </button>

          <button
          v-if="mode == 'create'"
          v-on:click.prevent="signin" 
          class="button"
          >
          Création du compte
          </button>

         <p v-if="errors.length ">
        
          <ul>
            <li v-bind:key="error" v-for="error in errors">{{ error }}</li>
          </ul>
          </p>
        </form>
       </div>
    
      
      </div>
 
</template>

<script>
import LoginNav from "@/components/LoginNav.vue";
import user from "../../_services/user";
import router from "@/router";
import tokenService from "@/_services/tokenService";
import Footer from '@/components/Footer.vue'


export default {
  name: "SignIn",
  data() {
    return {
      mode: "login",
      userData: {
        prenom: "",
        nom: "",
        pseudo: "",
        email: "",
        password: "",
      },
      errors: [],
    };
  },

  
  methods: {
    switchCreate: function () {
      this.mode = "create";
    },
    switchLogin: function () {
      this.mode = "login";
    },
    //--------------------------------------------------------//
    //--------Fonction Inscription avec validation des champs------//
    signin() {
      console.log('enter signin');
      // Vider errors
         this.errors = [];
      // ckeck prenom inferieur a 3 et superieur a 25
      if (!this.userData.prenom || this.userData.prenom.length < 3 || this.userData.prenom.length > 25) {
        this.errors.push("Prénom non renseigné ou invalid !");
      }
      // ckeck nom inferieur a 3 et superieur a 25
      if (!this.userData.nom || this.userData.nom.length < 3 || this.userData.nom.length > 25) {
        this.errors.push("Nom non renseigné ou invalid !");
      }
      // ckeck pseudo inferieur a 3 superieur a 25
      if (!this.userData.pseudo || this.userData.pseudo.length < 3 || this.userData.pseudo.length > 25) {
        this.errors.push("Pseudo non renseigné ou invalid !");
      }
      // ckeck email and regex
      let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!this.userData.email || !reg.test(this.userData.email)) {
        this.errors.push("Email non renseigné ou invalid !");
      }
      // ckeck mot de passe regex au moin une lettre et un nombre + autorise symbole
      let reg2 = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/
      if (!this.userData.password || !reg2.test(this.userData.password)) {
        this.errors.push("Mot de passe non renseigné ou invalid !");
      }
      if (!this.errors.length) {
        let userData = {
        nom: this.userData.nom,
        prenom: this.userData.prenom,
        pseudo: this.userData.pseudo,
        email: this.userData.email,
        password: this.userData.password,
      };
      user
        .addUser(userData)
        .then((res) => console.log(res), router.push("/"))
        .catch((err) => console.log(err));
      }   
    },
    //--------------------------------------------------------//
    //--------Fonction Connexion avec validation des champs------//
    login() {
       console.log('enter login');
      // Vider errors
         this.errors = [];
      // ckeck email and regex
      let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!this.userData.email || !reg.test(this.userData.email)) {
        this.errors.push("Email non renseigné ou invalid !");
      }
      // ckeck mot de passe regex au moin une lettre et un nombre + autorise symbole
      let reg2 = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/
      if (!this.userData.password || !reg2.test(this.userData.password)) {
        this.errors.push("Mot de passe non renseigné ou invalid !");
      }
      if (!this.errors.length) {
        let userData = {
        email: this.userData.email,
        password: this.userData.password,
      };
      user
        .authUser(userData)
        .then((res) => {
          console.log('token : ' + res.data.access_token),
          console.log('refresh : ' + res.data.refresh_token),
          console.log(res.data),
            tokenService.saveToken(res.data.access_token),
            tokenService.saveRefreshToken(res.data.refresh_token)
            router.push("/admin/wall");
        })
        .catch((err) => console.log(err));
      }
    },
  },

  components: {
    LoginNav,
  },
};
</script>

<style scoped>

.container {
  text-align: start; 
}
.card{
  width: 80%;
  margin: auto;
  margin-top: 100px;
  padding: 50px;
  background-color: #e8e8e8;
}
h2 {
  margin-top: 10px;
}
.btn {
  margin-top: 10px;
}
ul{
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}
</style>
