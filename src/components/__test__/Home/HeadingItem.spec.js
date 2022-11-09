import { mount } from '@vue/test-utils';
import HeadingItemVue from '../../Home/HeadingItem.vue';
import { describe, expect, it, vi } from "vitest";

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
}));

describe('HeadingItem', () => {
    it('Renders properly', () => {
        const wrapper = mount(HeadingItemVue)
        expect(wrapper.text()).toContain("Let's shorten it!")
    })
    it('Renders the greeting passed as prop', () => {
        const greet = "Hello vitest!"
        const wrapper = mount(HeadingItemVue, {
            props: {
                greeting: greet
            }
        })
        expect(wrapper.text()).toContain(greet)
    })
})

