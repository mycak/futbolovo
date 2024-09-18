import { NavigationItem, NavigationKey } from "@/types/common";

export const navigationItems: (
  isSignIn: boolean
) => Record<NavigationKey, NavigationItem[]> = (isSignIn) => ({
  mainPage: [
    {
      text: "Strona główna",
      to: "/",
    },
  ],
  map: [
    {
      text: "Mapa",
      to: "/map",
    },
    {
      text: "Dodaj punkt na mapie",
      to: "add-event",
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
