import { mount } from '@vue/test-utils';
import HeaderGlobalVue from '../../Home/UnsignedShortener.vue';
import { describe, expect, it, vi } from "vitest";
import HomeStrings from '../../../assets/translations/english/homestrings.json'

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
}));

describe('UnsignedShortener', () => {
    it('Renders properly', () => {
        const wrapper = mount(HeaderGlobalVue)
        expect(wrapper.text()).toContain("open source")
        expect(wrapper.text()).toContain("Contribute")
        expect(wrapper.text()).toContain("Submit an issue")
    })
})

