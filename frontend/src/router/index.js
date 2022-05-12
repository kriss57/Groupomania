import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from "@/_helpers/auth-guard";

import AdminLayout from '@/views/admin/Layout.vue'
import Wall from '@/views/admin/Wall.vue'
import Users from '@/views/admin/Users.vue'
import Remark from '@/views/admin/Remark.vue'
import Profil from '@/views/admin/Profil.vue'
import Article from '@/components/Article.vue'
import User from '@/components/User.vue'

const routes = [
  //------Bloc Login-------//
  { path: "/", name: "login", component: () => import(/* webpackChunkName: "SignIn" */ "../views/login/Login.vue"), },

  { path: '/article/:id', name: 'article', component: Article },
  { path: '/user/:id', name: 'user', component: User },
  //-----Bloc Admin-------//
  {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
    children: [
      { path: 'wall', name: 'wall', component: Wall },

      { path: 'users', name: 'users', component: Users },
      { path: 'remark', name: 'remark', component: Remark },
      { path: 'profil', name: 'profil', component: Profil },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  if (to.matched[0].name == 'admin') {
    authGuard()
  }

  next()
})

export default router
