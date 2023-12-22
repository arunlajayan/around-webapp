

export class User {
  id: string;
  email: string;
  username: string;

  // eslint-disable-next-line complexity
  constructor(user: User) {
    this.id = user?.id;
    this.email = user?.email;
    this.username = user?.username;
  }
}