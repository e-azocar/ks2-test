export interface UsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  order?: 'asc' | 'desc';
}
