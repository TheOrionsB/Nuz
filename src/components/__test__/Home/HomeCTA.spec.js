import { mount } from '@vue/test-utils';
import HomeCTA from '../../Home/HomeCTA.vue';
import { describe, expect, it, vi } from "vitest";
import HomeStrings from '../../../assets/homestrings.json';
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
        });        expect(wrapper.get("a[name='mainCTA']").text()).toContain(HomeStrings.CTA.mainCTA)
        expect(wrapper.get("a[name='subCTA']").text()).toContain(HomeStrings.CTA.subCTA)
    })
})
