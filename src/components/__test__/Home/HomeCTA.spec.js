import { mount } from '@vue/test-utils';
import HomeCTA from '../../Home/HomeCTA.vue';
import { describe, expect, it, vi } from "vitest";
import HomeStrings from '../../../assets/translations/english/homestrings.json'
import { createTestingPinia } from '@pinia/testing'

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
    useRouter: vi.fn()
}));

describe('HomeCTA', () => {

    it('Renders properly', () => {
        const wrapper = mount(HomeCTA, {
            global: {
                plugins: [ createTestingPinia({ createSpy: vi.fn }) ],
                stubs: ['FontAwesomeIcon']
            }
        });        expect(wrapper.findAll("router-link")[0].text()).toContain(HomeStrings.CTA.mainCTA)
        expect(wrapper.findAll("router-link")[1].text()).toContain(HomeStrings.CTA.subCTA)
    })
})
