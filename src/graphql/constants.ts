import { Country, getActiveCountry } from '../utils/country';
import { prop } from 'ramda';

const graphqlUrl = process.env.REACT_APP_GRAPHQL_ENDPOINT || '';

const countryCodeMap: Record<Country, string> = {
  [Country.Singapore]: 'sg',
  [Country.Taiwan]: 'tw',
  [Country.Pakistan]: 'pk',
  [Country.Bangladesh]: 'bd',
  [Country.Philippines]: 'ph',
  [Country.Thailand]: 'th',
  [Country.HongKong]: 'hk',
  [Country.Malaysia]: 'my',
  [Country.Bulgaria]: 'bg',
  [Country.Romania]: 'ro',
  [Country.Cambodia]: 'kh',
  [Country.Laos]: 'la',
  [Country.Myanmar]: 'mm',
  [Country.Japan]: 'jp',
  [Country.DLabs]: 'dl',
  [Country.Slovakia]: 'sk',
  // foodora
  [Country.Norway]: 'no',
  [Country.Sweden]: 'op',
  [Country.Finland]: 'po',
  [Country.CzechRepublic]: 'cz',
  [Country.Hungary]: 'hu',
  [Country.Austria]: 'mj',
  [Country.Turkey]: 'tr',
  [Country.Denmark]: 'dk',
};

export const getCountryCode = () =>
  getActiveCountry() in countryCodeMap ? prop(getActiveCountry(), countryCodeMap) : 'sg';

export const getApiUrl = () => {
  return graphqlUrl.replace('{COUNTRY_CODE}', getCountryCode());
};
