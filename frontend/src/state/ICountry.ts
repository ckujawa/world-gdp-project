import { ICity } from './ICity'

export interface ICountry {
    code: string,
    name: string,
    continent: string,
    region: string,
    surfaceArea: number,
    indepYear: number,
    population: number,
    lifeExpectancy: number,
    gnp: number,
    localName: string,
    governmentForm: string,
    headOfState: string,
    capital: ICity,
    code2: string
}

export interface ICountryReturnData{
    count: number,
    list: [ICountry]
}