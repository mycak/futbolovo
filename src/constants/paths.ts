export const paths = {
  Dashboard: "/",
  Map: "/map",
  //EVENTS
  Event: (id: string) => `/events/${id}`,
  EventAdd: "/events/add",
  EventAddConfirm: "/events/add/confirm",
  //CONTACT
  Contact: "/contact",
  //COOPERATION
  Cooperation: "/cooperation",
} as const;
