import { AreaList } from "../helper/DataReading.js";
import type {
  District,
  Division,
  Union,
  Upaliza,
} from "../interface/interface.js";

export const services = {
  getDivision: async (): Promise<Division[]> => {
    return await AreaList.getDivision();
  },

  getDistrict: async (divisionId: string): Promise<District[]> => {
    return await AreaList.getDistrict(divisionId);
  },

  getUpazila: async (districtId: string): Promise<Upaliza[]> => {
    return await AreaList.getUpazila(districtId);
  },

  getUnion: async (upazilaId: string): Promise<Union[]> => {
    return await AreaList.getUnion(upazilaId);
  },
};
