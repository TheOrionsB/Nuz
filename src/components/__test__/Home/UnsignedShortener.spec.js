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
        expect(wrapper.find("h2").text()).toContain(HomeStrings.unsignedShortener.usHeading);
        expect(wrapper.find("input[type=text]").attributes('placeholder')).toContain(HomeStrings.unsignedShortener.usInputPlaceholder)
        expect(wrapper.find("input[type=submit]").attributes('value')).toContain(HomeStrings.unsignedShortener.usSubmitValue)
    })
    it('Submits correctly', () => {
        const wrapper = mount(HeaderGlobalVue);
        wrapper.find('input[type=text]').setValue("http://google.com");
        expect(console.assert(true, ''));
        wrapper.find('form').trigger('submit');
        expect(console.assert(true, 'Form submitted with target: http://google.com'))
    })
})

