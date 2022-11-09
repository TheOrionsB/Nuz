import { mount } from '@vue/test-utils';
import HeadingItemVue from '../../Home/HeadingItem.vue';
import { describe, expect, it, vi } from "vitest";
import HomeStrings from '../../../assets/homestrings.json';
vi.mock('vue-router', () => ({
    resolve: vi.fn(),
}));

describe('HeadingItem', () => {
    it('Renders properly', () => {
        const wrapper = mount(HeadingItemVue)
        expect(HomeStrings.motd).toContain(wrapper.text())
    })
})

