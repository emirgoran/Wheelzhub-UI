export interface User {
  id: number;
  username: string;
  password: string;
}

export interface UserEditProps {
  user: User;
  onFinishedEditing: () => void;
}

export const defaultUserData: User = {
  id: 0,
  username: '',
  password: '',
};