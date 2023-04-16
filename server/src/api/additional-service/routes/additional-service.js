'use strict';

/**
 * additional-service router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::additional-service.additional-service');
