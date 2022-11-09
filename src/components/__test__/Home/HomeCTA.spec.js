import { mount } from '@vue/test-utils';
import HomeCTA from '../../Home/HomeCTA.vue';
import { describe, expect, it, vi } from "vitest";
import HomeStrings from '../../../assets/homestrings.json';

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
}));

describe('HomeCTA', () => {
    it('Renders properly', () => {
        const wrapper = mount(HomeCTA)
        expect(wrapper.get("a[name='mainCTA']").text()).toContain(HomeStrings.CTA.mainCTA)
        expect(wrapper.get("a[name='subCTA']").text()).toContain(HomeStrings.CTA.subCTA)
    })
})
