class Sdk {
  static getActiveCountry() {
    return {
      geid: "FP_SG",
      code: "SG",
    };
  }

  onCountryChange(_callback: (activeCountry: Record<string, string>) => void) {}

  static getPluginBaseRoute() {
    return "https://portal-fp-euw-stg-vt.deliveryhero.io/sg/p/mmt";
  }

  static getActivePlugin() {
    return "test-plugin";
  }

  static getToken() {
    return "test-token";
  }

  static getUser() {
    return {};
  }

  static getPluginRoles(pluginCode: string, countryCode: string) {
    console.log('pluginCode', pluginCode);
    console.log('countryCode', countryCode);
    return [];
  }
}

export default Sdk;
