export interface SuccessResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface PaginationResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
