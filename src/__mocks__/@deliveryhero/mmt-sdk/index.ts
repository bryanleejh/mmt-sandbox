class Sdk {
  getActiveCountry() {
    return {
      geid: 'FP_SG',
      code: 'SG',
    };
  }

  onCountryChange(callback: (activeCountry: ReturnType<Sdk['getActiveCountry']>) => void) {}

  getPluginBaseRoute() {
    return 'https://portal-fp-euw-stg-vt.deliveryhero.io/sg/p/mmt';
  }

  getActivePlugin() {
    return 'test-plugin';
  }

  getToken() {
    return 'test-token';
  }

  getUser() {
    return {};
  }

  static getPluginRoles(pluginCode: string, countryCode: string) {
    return [];
  }
}

export default Sdk;
