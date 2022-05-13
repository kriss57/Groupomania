<template>
  <div class="container mt-5">
    <div class="modale">
      <button v-on:click="toggleModale" class="btn btn-outline-secondary">
        Poster un article
      </button>
      <ModalArticle
        v-bind:revele="revele"
        v-bind:toggleModale="toggleModale"
      ></ModalArticle>
    </div>

    <div class="article-card" v-bind:key="id" v-for="(article, id) in articles">
      <router-link v-bind:to="`/article/${article.id}`">
        <div class="card">
          <div class="card-header">
            <p>
              <strong>{{ article.User.pseudo }}</strong> <small>a posté</small>
            </p>

            <p>Le {{ dateFormat[id] }}</p>
          </div>
          <div class="contenu">
            <div class="title-contenu">
              <p id="title">{{ article.titre }}</p>
              <p>{{ article.contenu }}</p>
            </div>

            <img
              class="articleImage"
              :src="article.image"
              onerror="this.style.display='none'"
              alt="image du post"
            />
          </div>
        </div>
      </router-link>
      <div id="coment-container" class="overflow-auto">
        <div class="comment-card">
          <div v-bind:key="remark" v-for="remark in remarks">
            <div v-if="article.id == remark.article_id" class="form-group">
              <div class="comment-text">
                <p id="comment">
                  <strong> {{ remark.User.pseudo }}: </strong
                  >{{ remark.contenu }}
                </p>
                <button
                  @click="deleteRemark(remark.id)"
                  id="del"
                  v-if="userActuId == remark.user_id"
                  type="submit"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-group mb-3">
        <input
          v-model="remarkData.contenu"
          type="text"
          class="form-control"
          placeholder="commenter"
          aria-label="commenter"
        />
        <div class="input-group-append">
          <button
            @click="createRemark(article.id)"
            class="btn btn-outline-secondary"
            type="button"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalArticle from "@/components/ModalArticle.vue";
import article from "../../_services/article";
import remark from "@/_services/remark";
import router from "@/router";
import jwt_decode from "jwt-decode";

export default {
  name: "Wall",
  data() {
    return {
      revele: false,
      articles: [],
      remarks: [],
      remarkData: [],
      userActuPrenom: "",
      userActuPseudo: "",
      userActuId: "",
      userActu: [],
      isModo: false,
    };
  },
  methods: {
    //-----------------------------//
    //--Méthode toggleModale
    toggleModale: function () {
      this.revele = !this.revele;
    },

    //-------------------------------//
    //---Création d'un commentaire
    createRemark(id) {
      let remarkData = {
        user_id: this.userActuId,
        article_id: id,
        contenu: this.remarkData.contenu,
      };
      console.log(this.remarkData.contenu);

      remark
        .addRemark(remarkData)
        .then((res) => console.log(res), this.$router.go())
        .catch((err) => console.log(err));
    },
    //-----------------------------------//
    //---Supréssion d'un commentaire
    deleteRemark(id) {
      remark
        .deleteRemark(id)
        .then((res) => console.log(res), this.$router.go())
        .catch((err) => console.log(err));
    },
  },
  //---Ici les calculs avant affichage template
  computed: {
    dateFormat(id) {
      return this.articles.map(
        (u) =>
          u.createdAt.slice(0, 10).split("-").reverse().join(".") +
          " à " +
          u.createdAt.split("T")[1].split(".")[0]
      );
    },
  },
  components: {
    ModalArticle,
  },
  //change mounted a la place de created
  created() {
    //--------------------------------------------//
    //--Récupération des info user dans le token
    const token = localStorage.getItem("token");
    const userData = jwt_decode(token);
    console.log(userData);
    this.userActuPrenom = userData.prenom;
    this.userActuId = userData.id;
    this.userActuPseudo = userData.prenom;

    //---------------------------------//
    //--Récupération de tous les posts
    article
      .getAllArticles()
      .then((res) => {
        console.log(res);
        for (const allArticles of res.data.data) {
          this.articles.push(allArticles);
        }
      })
      .catch((err) => console.log(err));

    //-----------------------------------------//
    //---Récupérations de tout les commentaires
    remark
      .getAllRemarks()
      .then((res) => {
        console.log(res);
        console.log(res.data.data);
        for (const allRemarks of res.data.data) {
          this.remarks.push(allRemarks);
        }
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.article-card {
  padding-left: 20px;
  padding-right: 20px;
  border: 2px solid rgba(214, 219, 230, 0.988);
  box-shadow: 10px 5px 10px rgb(10, 3, 107);
  background-color: #f05454;
  border-radius: 25px;
  margin-bottom: 100px;
}
.contenu {
  margin: auto;
  width: 100%;
}
#title {
  border-bottom: solid 1px #f05454;
  padding: 10px;
  font-size: medium;
  font-weight: bolder;
  text-transform: uppercase;
  color: rgb(82, 71, 227);
}
img {
  height: 100%;

  max-height: 400px;
  width: 100%;
  margin: auto;
  object-fit: cover;
}

a {
  text-decoration: none;
}
.btn {
  background-color: #f05454;

  color: antiquewhite;
}
.card {
  margin: auto;
  margin-top: 20px;
  background-color: #e8e8e8;
}
.card-header {
  display: flex;
  justify-content: space-around;
  padding-top: 18px;
  background-color: #f054549a;
}
.article-card {
  margin: auto;
  margin-bottom: 100px;
  max-width: 70%;
}
#coment-container {
  background-color: white;
  overflow: scroll;
  max-height: 150px;
  border: 1px solid rgb(238, 169, 169);
  border-radius: 15px 0 0 15px;
  margin: 20px;
  padding-left: 20px;
}
#comment {
  width: 90%;
  border-bottom: solid 2px #f05454;
  border-radius: 10px;
  padding: 5px;
}
.comment-text {
  display: flex;
}
.btn {
  margin-bottom: 20px;
}
#del {
  height: 15px;
  width: 15px;
  border-radius: 15px;
  margin-top: 15px;
}
.modale {
  right: 0;
  background: none;
  z-index: 500;
}
input,
p {
  color: black;
  width: 80%;
  height: 40px;
  padding-left: 10px;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
