import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Hello from "./views/Hello.vue";

import Login from "./views/Login.vue";
import Register from "./views/Register.vue"

import WithdrawRegistration from "./components/WithdrawRegistration.vue"
import Charge from "./components/Charge"
import WithdrawCharge from "./components/WithdrawCharge.vue"
import Registration from "./components/Registration.vue"
import HomePage from "./components/HomePage.vue"


Vue.use(Router);

export default new Router({
  routes: [{
      path: "/home",
      name: "Home",
      component: Home,
      children: [{
          path: "Registration",
          name: "Registration",
          component: Registration
        },
        {
          path: "withdrawRegistration",
          name: "withdrawRegistration",
          component: WithdrawRegistration
        },
        {
          path: "charge",
          name: "charge",
          component: Charge
        },
        {
          path: "withdrawCharge",
          name: "withdrawCharge",
          component: WithdrawCharge
        },
        {
          path: "homePage",
          name: "homePage",
          component: HomePage
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/hello",
      name: "hello",
      component: Hello
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    }

  ]
});