import { mount } from '@vue/test-utils';
import HeaderGlobalVue from '../HeaderGlobal.vue';
import { describe, expect, it, vi } from "vitest";
import HomeStrings from '../../assets/homestrings.json';

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
  }));

describe('HeaderGlobal', () => {
    it('Renders properly', () => {
        const wrapper = mount(HeaderGlobalVue);
        expect(wrapper.text()).toContain(HomeStrings.headerTitle);
        for (let i in HomeStrings.Navigation.length) {
            expect(wrapper.find(`a[key=${i}]`).text()).toContain(HomeStrings.Navigation[i].pretty);
        }
    })
})