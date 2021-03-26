import { ICountry } from "./ICountry";

export interface ICity{
    id: number,
    name: string,
    countryCode: string,
    country: ICountry | null,
    district: string,
    population: number
}