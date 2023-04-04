// общий интерфейс для элементов из каталога
export interface CatalogItem{
  id:number,
  attributes:ScooterItemType
}
//интерфейс скутеров
export interface ScooterItemType {
  Title: string;
  weight: number;
  max_speed: number;
  power: number;
  max_range: string;
  Price: number;
  discount_percent: number|null;
  battery_capacity: number;
  charge_time: string;
  wheel_size: number;
  gabarits: string;
  maximum_load: number;
  lighting: string;
  guarantee: string;
  type_wheels: string;
  equipment: string;
  privod: string;
  stop_system: string;
  type: string;
  user_type: string;
  images: [];
  badges: [];
  category: string;
}
