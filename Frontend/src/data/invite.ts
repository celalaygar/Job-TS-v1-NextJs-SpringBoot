export enum InviteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED"
}

export interface InviteProject {
  id: number;
  name: string;
}

export interface InviteUser {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  role: string;
}

export interface Invite {
  id: number;
  project: InviteProject; // Davet edilen proje
  status: InviteStatus;
  invitingUser: InviteUser;
  invitedUser: InviteUser;
}