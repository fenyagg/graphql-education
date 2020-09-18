export interface IUser {
  id: number;
  name: string;
  avatar: {
    large: string;
    medium: string;
  };
  siteUrl: string;
  updatedAt: number;
}
