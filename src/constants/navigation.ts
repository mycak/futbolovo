import { NavigationItem, NavigationKey } from "@/types/common";
import { paths } from "./paths";

export const navigationItems: (
  isSignIn: boolean
) => Record<NavigationKey, NavigationItem[]> = (isSignIn) => ({
  mainPage: [
    {
      text: "Strona główna",
      to: paths.Dashboard,
    },
  ],
  map: [
    {
      text: "Mapa",
      to: paths.Map,
    },
    {
      text: "Dodaj punkt na mapie",
      to: paths.EventAdd,
    },
  ],
  auth: isSignIn
    ? [
        {
          text: "Wyloguj",
          to: "/signout",
        },
      ]
    : [
        {
          text: "Zaloguj",
          to: "/login",
        },
        {
          text: "Zarejestruj",
          to: "/register",
        },
      ],
});
