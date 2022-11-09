import { mount } from '@vue/test-utils';
import HomeCTA from '../../Home/HomeCTA.vue';
import { describe, expect, it, vi } from "vitest";

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
}));

describe('HeadingItem', () => {
    it('Renders properly', () => {
        const wrapper = mount(HomeCTA)
        expect(wrapper.get("a[name='mainCTA']").text()).toContain("Get started with an account")
        expect(wrapper.get("a[name='subCTA']").text()).toContain("Log in with an existing account")
    })
})
