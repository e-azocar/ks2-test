export interface PropertiesQuery {
  page?: number;
  limit?: number;
  status?: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  propertyTypeId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  onlyMine?: boolean;
  orderBy?: 'price' | 'createdAt';
  order?: 'asc' | 'desc';
}
