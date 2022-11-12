import { mount } from '@vue/test-utils';
import HomeCTA from '../../Home/HomeCTA.vue';
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomeStrings from '../../../assets/homestrings.json';
import { createPinia, setActivePinia } from 'pinia'

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
    useRouter: vi.fn()
}));

describe('HomeCTA', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    })
    it('Renders properly', () => {
        const wrapper = mount(HomeCTA)
        expect(wrapper.get("a[name='mainCTA']").text()).toContain(HomeStrings.CTA.mainCTA)
        expect(wrapper.get("a[name='subCTA']").text()).toContain(HomeStrings.CTA.subCTA)
    })
})
