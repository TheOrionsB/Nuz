import { mount } from '@vue/test-utils';
import HeaderGlobalVue from '../HeaderGlobal.vue';
import { describe, expect, it, vi } from "vitest";
import { isReactive } from 'vue';

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
  }));

describe('HeaderGlobal', () => {
    it('Renders properly', () => {
        const wrapper = mount(HeaderGlobalVue);
        expect(wrapper.text()).toContain("Nuz");
        expect(wrapper.text()).toContain("About");
        expect(wrapper.text()).toContain("Home");
        expect(wrapper.text()).toContain("Log in");
        expect(wrapper.text()).toContain("Sign up");
    })
})