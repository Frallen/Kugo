module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  meilisearch: {
    config: {
      // Your meili host
      host: env('SEARCH'),
      // Your master key or private key
      apiKey: env('APP_KEYS'),
    }
  }
  // ...
});
