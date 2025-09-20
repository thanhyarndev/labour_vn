export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
  role?: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  isActive?: boolean;
}
