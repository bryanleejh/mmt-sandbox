import mmtSdk from '../../mmtSdk';
import { Country } from './country';

export const getActiveCountry = (): Country => (mmtSdk.getActiveCountry()?.geid as Country) || Country.Singapore;
