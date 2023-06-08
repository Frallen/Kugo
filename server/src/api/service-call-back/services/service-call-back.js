'use strict';

/**
 * service-call-back service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::service-call-back.service-call-back');
