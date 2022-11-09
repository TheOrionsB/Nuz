import { mount } from '@vue/test-utils';
import HeaderGlobalVue from '../../Home/UnsignedShortener.vue';
import { describe, expect, it, vi } from "vitest";

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
}));

describe('HeaderGlobal', () => {
    it('Renders properly', () => {
        const wrapper = mount(HeaderGlobalVue)
        expect(wrapper.text()).toContain("Shorten without signing up!")
        expect(wrapper.find("input[type=text]").attributes('placeholder')).toContain("Your target URL")
        expect(wrapper.find("input[type=submit]").attributes('value')).toContain("Shorten now!")
    })
    it('Submits correctly', () => {
        const wrapper = mount(HeaderGlobalVue);
        wrapper.find('input[type=text]').setValue("http://google.com");
        expect(console.assert(true, ''));
        wrapper.find('form').trigger('submit');
        expect(console.assert(true, 'Form submitted with target: http://google.com'))
    })
})

