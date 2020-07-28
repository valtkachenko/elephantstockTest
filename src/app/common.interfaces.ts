export type UserRole = 'Artist' | 'Designer' | 'Art manager';

export interface User {
  _id?: string,
  firstName: string,
  lastName: string,
  email: string,
  role: UserRole,
};

export type TableFilter = {
  searchString: string,
  role: UserRole | 'All',
}
