import fs from "fs/promises";
import { cwd } from "process";

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

export class AreaList {
  private static divisionsCache: Division[] | null = null;
  private static districtsCache: District[] | null = null;
  private static upazilasCache: Upaliza[] | null = null;
  private static unionsCache: Union[] | null = null;

  private static async readingJson<T>(path: string): Promise<T[] | null> {
    try {
      const data = await fs.readFile(path, "utf-8");
      return JSON.parse(data) as T[];
    } catch (error) {
      throw new Error("Json File  not found");
      return null;
    }
  }

  static async getDivision(): Promise<Division[]> {
    if (!this.divisionsCache) {
      this.divisionsCache =
        (await this.readingJson<Division>(
          `${cwd()}/src/data/divisions.json`,
        )) || [];
    }

    return this.divisionsCache;
  }

  static async getDistrict(division_id?: string): Promise<District[]> {
    if (!this.districtsCache) {
      this.districtsCache =
        (await this.readingJson<District>(
          `${cwd()}/src/data/districts.json`,
        )) || [];
    }

    if (division_id) {
      return this.districtsCache.filter((d) => d.division_id === division_id);
    }
    return this.districtsCache;
  }

  static async getUpazila(district_id?: string): Promise<Upaliza[]> {
    if (!this.upazilasCache) {
      this.upazilasCache =
        (await this.readingJson<Upaliza>(`${cwd()}/src/data/upazilas.json`)) ||
        [];
    }

    if (district_id) {
      return this.upazilasCache.filter((u) => u.district_id === district_id);
    }
    return this.upazilasCache;
  }

  static async getUnion(upazilla_id?: string): Promise<Union[]> {
    if (!this.unionsCache) {
      this.unionsCache =
        (await this.readingJson<Union>(`${cwd()}/src/data/unions.json`)) || [];
    }

    if (upazilla_id) {
      return this.unionsCache.filter((u) => u.upazilla_id === upazilla_id);
    }
    return this.unionsCache;
  }
}
