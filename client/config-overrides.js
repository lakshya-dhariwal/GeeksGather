module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.fallback = {
    assert: require.resolve("assert"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    stream: require.resolve("stream-browserify"),
    zlib: require.resolve("browserify-zlib"),
    assert: require.resolve("assert/"),
    url: require.resolve("url/"),
  };
  return config;
};
