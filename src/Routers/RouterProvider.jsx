import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import LogIn from "../auth/LogIn";
import Register from "./Register";
import AllCamign from "../pages/AllCamign";
import AddCap from "../pages/AddCap";
import MyCamo from "../pages/MyCamo";
import MyDonation from "../pages/MyDonation";
import Privete from "./Privete";
import Details from "../pages/Details";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Update from "../components/Update";
import Donated from "../components/Donated";
import Fourzero from "../components/Fourzero";
import Public from "./Public";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Fourzero></Fourzero>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/auth/login",
        element: (
          <Public>
            <LogIn></LogIn>
          </Public>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <Public>
            <Register></Register>
          </Public>
        ),
      },
      {
        path: "/finds-losts/all-finds",
        element: <AllCamign></AllCamign>,
      },
      {
        path: "/items/update/:id",
        element: (
          <Privete>
            <Update></Update>
          </Privete>
        ),
        loader: ({ params }) =>
          fetch(`https://lostserver.vercel.app/itemsUpadte/${params.id}`),
      },
      {
        path: "/lost-finds/all/details/:id",
        element: (
          <Privete>
            <Details></Details>
          </Privete>
        ),
        loader: ({ params }) =>
          fetch(`https://lostserver.vercel.app/lost-finds/${params.id}`),
      },
      {
        path: "/recover/all/details/:id",
        element: (
          <Privete>
            <Details></Details>
          </Privete>
        ),
        loader: ({ params }) =>
          fetch(`https://lostserver.vercel.app/recover/${params.id}`),
      },
      {
        path: "/donation/all-campagion/details/donated/:id",
        element: (
          <Privete>
            <Donated></Donated>
          </Privete>
        ),
        loader: ({ params }) =>
          fetch(`https://lostserver.vercel.app/donations/${params.id}`),
      },
      {
        path: "/donation/add-campagion",
        element: (
          <Privete>
            <AddCap></AddCap>
          </Privete>
        ),
      },
      {
        path: "/donation/my-donation",
        element: (
          <Privete>
            <MyDonation></MyDonation>
          </Privete>
        ),
      },
      {
        path: "/finds-losts/my-Iteam",
        element: (
          <Privete>
            <MyCamo></MyCamo>
          </Privete>
        ),
      },
      {
        path: "/auth/users/profile",
        element: (
          <Privete>
            <Profile></Profile>
          </Privete>
        ),
      },
    ],
  },
]);

export default router;
