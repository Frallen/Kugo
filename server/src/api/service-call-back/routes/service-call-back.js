'use strict';

/**
 * service-call-back router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::service-call-back.service-call-back');
