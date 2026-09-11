export interface Division {
  id: string;
  name: string;
  bn_name: string;
  url: string;
}
export interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: number;
  lon: number;
  url: string;
}

export interface Upaliza {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface Union {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
}
