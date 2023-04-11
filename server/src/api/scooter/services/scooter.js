'use strict';

/**
 * scooter service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::scooter.scooter');
