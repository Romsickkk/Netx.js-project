export const homePath = () => "/";

export const ticketsPath = () => "/tickets";
export const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;
export const ticketEditPath = (ticketId: string) => `${ticketPath(ticketId)}`;

export const singUpPath = () => "/sign-up";
export const singInPath = () => "/sign-in";
export const passwordForgotPath = () => "/password-forgot";

export const accountProfilePath = () => "/account/profile";
export const accountPasswordPath = () => "/account/password";
