import { mount } from '@vue/test-utils';
import SignUp from '../../Authentication/SignUp.vue';
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
import waitForExpect from 'wait-for-expect';

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
    resolve: vi.fn,
    useRouter: () => ({
        push: mockPush
    }),

}));

describe("SignUp component", () => {
    it('renders its first stage correctly', () => {
        const wrapper = mount(SignUp, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
                stubs: ['FontAwesomeIcon']
            }
        });
        expect(wrapper.text()).toContain('Choose a username');
        expect(wrapper.findAll('input[type=text]').length).toBe(1);
    });
    it('develops to 2nd stage', async () => {
        const wrapper = mount(SignUp, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
                stubs: ['FontAwesomeIcon']
            }
        });
        expect(wrapper.text()).toContain('Choose a username');
        wrapper.find("input[type=text]").setValue('NewUser');
        await nextTick(() => {
            expect(wrapper.findAll('input[type=password]').length).toBe(1);
        })
    })
    it('develops to 3rd stage', async () => {
        const wrapper = mount(SignUp, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
                stubs: ['FontAwesomeIcon']
            }
        });
        expect(wrapper.text()).toContain('Choose a username');
        wrapper.find("input[type=text]").setValue('NewUser');
        await nextTick(() => {
            wrapper.findAll('input[type=password]')[0].setValue('pass')
        })
        await nextTick(() => {
            expect(wrapper.findAll('input[type=password]').length).toBe(2);
        })
    })
    it('develops to 4th stage', async () => {
        const wrapper = mount(SignUp, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
                stubs: ['FontAwesomeIcon']
            }
        });
        expect(wrapper.text()).toContain('Choose a username');
        await wrapper.find("input[type=text]").setValue('NewUser');
        await nextTick(() => expect(wrapper.findAll('input[type=password]').length).toBe(1))
        await wrapper.findAll("input[type=password]")[0].setValue('pass');
        await wrapper.findAll("input[type=password]")[0].trigger('blur');
        await nextTick(() => expect(wrapper.findAll('input[type=password]').length).toBe(2))
        await wrapper.findAll("input[type=password]")[1].setValue('pass');
        await wrapper.findAll("input[type=password]")[1].trigger('blur');
        await waitForExpect(() => {
            expect(wrapper.findAll('input[type=submit]').length).toBe(1);
        })
    })
})