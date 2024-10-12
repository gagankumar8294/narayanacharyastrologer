/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          dns: false,  // Ignore 'dns' module on the client side
          fs: false,   // Ignore 'fs' (file system) module on the client side
          net: false,  // Ignore 'net' module on the client side
          tls: false,  // Ignore 'tls' (transport layer security) module on the client side
        };
      }
      return config;
    },
  };
  
  module.exports = nextConfig;
  