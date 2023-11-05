export interface IproductList {
  sort_by: string;
  order_by: string;
  page_number: string;
  no_of_records: number;
  search: string;
  search_by: string;
  color: string;
  clarity: string;
  weight: string;
  shape: string;
  stone_type: any[];
}

export interface IhomepageProduct {
  id: number;
  status: number;
  lot_no: string;
  stone_id: string;
  location: string;
  weight: number;
  shape: string;
  color: string;
  clarity: string;
  cut: string;
  polish: string;
  symmetry: string;
  rapnet_price: string;
  system_discount: string;
  lab: string;
  certificate: string;
  certi_pdf_url: string;
  ratio: string;
  measurements: string;
  fluor_int: string;
  table: string;
  depth: string;
  crown_ht: string;
  crown_angle: string;
  pavilion_dep: string;
  pavilion_an: string;
  stone_type: string;
  v360: string;
  imgurl: string;
  eye_clean: number;
  system_price: number;
  system_amount: string;
}
