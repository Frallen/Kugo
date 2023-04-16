'use strict';

/**
 * additional-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::additional-service.additional-service');
