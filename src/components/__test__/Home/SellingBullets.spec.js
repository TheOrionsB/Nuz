import { mount } from '@vue/test-utils';
import SellingBullets from '../../Home/SellingBullets.vue';
import { describe, expect, it, vi } from "vitest";

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
}));

describe('HeadingItem', () => {
    it('Renders properly', () => {
        const wrapper = mount(SellingBullets)
        expect(wrapper.get("h2").text()).toContain("Yet another url shortener but this time:")
        expect(wrapper.findAll("li")).toHaveLength(5);
    })
})
