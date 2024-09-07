import { proxy } from '@umijs/max';

const TEMPLATE_TEST_CONFIGS = {
  removeBgTemplateId: 2,
  fastClearifyTemplateId: 3,
  fastExpandTemplateId: 4,
  fastRemoveObjectTemplateId: 5,
};

export const state = proxy({
  template: TEMPLATE_TEST_CONFIGS,
});
