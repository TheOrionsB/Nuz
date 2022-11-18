import { mount } from '@vue/test-utils';
import SellingBullets from '../../Home/SellingBullets.vue';
import { describe, expect, it, vi } from "vitest";
import HomeStrings from '../../../assets/translations/english/homestrings.json'

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
}));

describe('HeadingItem', () => {
    it('Renders properly', () => {
        const wrapper = mount(SellingBullets)
        expect(wrapper.get("h2").text()).toContain(HomeStrings.bulletPoints.bulletHeading)
        expect(wrapper.findAll("li")).toHaveLength(HomeStrings.bulletPoints.bulletPoints.length);
    })
})
