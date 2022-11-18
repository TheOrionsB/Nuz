import { mount, RouterLinkStub } from '@vue/test-utils';
import HeaderGlobalVue from '../HeaderGlobal.vue';
import { describe, expect, it, vi } from "vitest";
import HomeStrings from '../../assets/translations/english/homestrings.json'
import { createTestingPinia } from '@pinia/testing'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
    useRouter: vi.fn()
}));

describe('HeaderGlobal', () => {
    it('Renders properly', () => {
        const wrapper = mount(HeaderGlobalVue, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
                stubs: {
                    FontAwesomeIcon: FontAwesomeIcon,
                    RouterLink: RouterLinkStub
                }
            }
        }); expect(wrapper.text()).toContain(HomeStrings.headerTitle);
        for (let i in HomeStrings.Navigation.length) {
            expect(wrapper.find(`a[key=${i}]`).text()).toContain(HomeStrings.Navigation[i].pretty);
        }
    })
})