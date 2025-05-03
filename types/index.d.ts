import { Decimal } from '@prisma/client/runtime';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  password?: string;
  role: UserRole;
  image?: string;
  isTwoFactorEnabled: boolean;
  twoFactorConfirmation?: TwoFactorConfirmation;
  accounts: Account[];
  stores: Store[];
  orders: Order[];
  request: Request[];
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user: User;
}

export interface VerificationToken {
  id: string;
  email: string;
  token: string;
  expires: Date;
}

export interface PasswordResetToken {
  id: string;
  email: string;
  token: string;
  expires: Date;
}

export interface TwoFactorToken {
  id: string;
  email: string;
  token: string;
  expires: Date;
}

export interface TwoFactorConfirmation {
  id: string;
  userId: string;
  user: User;
}

export interface Store {
  id: string;
  name: string;
  location: string;
  status: boolean;
  rating: number;
  created_at: Date;
  ownerId: string;
  image: string;
  request: Request[];
  products: Product[];
  order: Order[];
  user: User;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: Decimal;
  type: string;
  material?: string;
  image: string;
  available: boolean;
  created_at: Date;
  orderItems: OrderedItems[];
  store: Store;
}

export interface Order {
  id: string;
  customerId: string;
  storeId: string;
  status: string;
  total: Decimal;
  created_at: Date;
  orderItems: OrderedItems[];
  store: Store;
  user: User;
}

export interface OrderedItems {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: Decimal;
  product: Product;
  order: Order;
}

export interface Request {
  id: string;
  storeId: string;
  ownerId: string;
  type: string;
  status: string;
  created_at: Date;
  store: Store;
  user: User;
}
