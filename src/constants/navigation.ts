import { NavigationItem, NavigationKey } from "@/types/common";
import { paths } from "./paths";

export const navigationItems: (
  isSignIn: boolean
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
) => Record<NavigationKey, NavigationItem[]> = (_isSignIn) => ({
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
  other: [
    {
      text: "Kontakt",
      to: paths.Contact,
    },
    {
      text: "Współpraca",
      to: paths.Cooperation,
    },
  ],
  // auth: isSignIn
  //   ? [
  //       {
  //         text: "Wyloguj",
  //         to: "/signout",
  //       },
  //     ]
  //   : [
  //       {
  //         text: "Zaloguj",
  //         to: "/login",
  //       },
  //       {
  //         text: "Zarejestruj",
  //         to: "/register",
  //       },
  //     ],
});
