export const paths = {
  Dashboard: '/',
  Map: '/map',
  //EVENTS
  Event: (id: string) => `/events/${id}`,
  EventAdd: '/events/add',
  EventEdit: '/events/edit',
  EventAddConfirm: '/events/add/confirm',
  //CONTACT
  Contact: '/contact',
  //COOPERATION
  Cooperation: '/cooperation',
  //PRIVACY POLICY
  PrivacyPolicy: '/privacy-policy',
  //STATUTE
  Statute: '/statute',

  //AUTH
  Register: '/register',
  Login: '/login',
  PasswordReset: '/password-reset',
  PasswordResetConfirm: '/password-reset/confirm',
  PasswordRemind: '/password-remind',
  RegisterConfirm: '/register-confirm',

  //USER
  MyEvents: '/my-events',
  Profile: '/profile',
} as const;
