'use strict';

/**
 * scale service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::scale.scale');
