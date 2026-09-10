import fs from "fs/promises";
import { cwd } from "process";

interface Division {
  id: number;
  name: string;
  bn_name: string;
  url: string;
}

interface District {
  id: number;
  division_id: number;
  name: string;
  bn_name: string;
  lat: number;
  lon: number;
  url: string;
}

interface Upaliza {
  id: number;
  district_id: number;
  name: string;
  bn_name: string;
  url: string;
}

interface Union {
  id: number;
  upazilla_id: number;
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
      console.error(error);
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

  static async getDistrict(division_id?: number): Promise<District[]> {
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

  static async getUpazila(district_id?: number): Promise<Upaliza[]> {
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

  static async getUnion(upazilla_id?: number): Promise<Union[]> {
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
