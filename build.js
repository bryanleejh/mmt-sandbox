/* eslint-disable @typescript-eslint/no-var-requires */
const StyleDictionary = require('style-dictionary');
const paramCase = require('param-case').paramCase;

// Register custom transforms
StyleDictionary.registerTransform({
  name: 'name/cti/kebabCustom',
  type: 'name',
  transformer: function(prop, options) {
    return paramCase([options.prefix].concat(prop.path).join(' '));
  },
});

StyleDictionary.registerTransform({
  name: 'value/cssVar',
  type: 'value',
  transformer: function(prop, options) {
    return 'var(--' + paramCase([options.prefix].concat(prop.path).join(' ')) + ')';
  },
});

// Apply the config
StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.json');

// Build
StyleDictionaryExtended.buildAllPlatforms();
