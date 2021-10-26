import React from "react";
import { Redirect } from "react-router-dom";
import Login from "../pages/Onboarding";
// lazy load all the views
const Home = React.lazy(() => import("../pages/Home/index"));
const Profile = React.lazy(() => import("../pages/Profile/index"));
const Blogs = React.lazy(() => import("../pages/MyBlog/index"));

const authProtectedRoutes = [
  {
    path: "/home",
    component: Home,
    meta: { auth: true },
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      auth: true,
    },
  },
  {
    path: "/blogs",
    component: Blogs,
    meta: {
      auth: true,
    },
  },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />,
    meta: { auth: true },
  },
];

const publicRoutes = [
  { path: "/login", exact: true, component: Login, meta: { guest: true } },
];

const routes = [...authProtectedRoutes, ...publicRoutes];

export { authProtectedRoutes, publicRoutes, routes };
