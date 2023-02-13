export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILE: '/profile',
  RECOVERY_PASSWORD: '/recovery_password',
  FORGOT_PASSWORD: '/forgot-password',
  SET_NEW_PASSWORD: '/set-new-password/:token',
  CHECK_EMAIL: '/check-email',
  NEW_PASSWORD: '/set-new-password/:token',
  PACKS_LIST: '/packs-list',
  FULL_PACK: '/full-pack/:id?',
  EMPTY_PACK: '/empty-pack',
} as const
