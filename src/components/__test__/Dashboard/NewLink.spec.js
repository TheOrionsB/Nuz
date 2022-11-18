import { mount } from '@vue/test-utils';
import NewLink from '../../../components/Dashboard/NewLink.vue';
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from '@pinia/testing'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { nextTick } from 'vue';

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
    useRouter: vi.fn()
}));

const labels = ["Create a new link",
    "If you don't want your link to expire or to be password protected, leave their optionnal fields empty",
    "Link name",
    "Target URL",
    "Generated link",
    "Password protected (Optionnal)",
    "Expiration (Optionnal)",]

describe('New link component', () => (
    it('renders correctly', () => {
        const wrapper = mount(NewLink, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
                stubs: ['FontAwesomeIcon']
            }
        })
        for (let label in labels) {
            expect(wrapper.text()).toContain(labels[label]);
        }
        expect(wrapper.findAll('input').length).toBe(6);
    })
))