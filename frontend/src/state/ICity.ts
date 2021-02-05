import { ICountry } from "./ICountry";

export interface ICity{
    id: number,
    name: string,
    countryCode: string,
    country: ICountry | null,
    distrinct: string,
    population: number
}