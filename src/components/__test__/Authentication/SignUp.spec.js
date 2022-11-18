import { mount } from '@vue/test-utils';
import SignUp from '../../Authentication/SignUp.vue';
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
import waitForExpect from 'wait-for-expect';
import { useAuthenticationStore } from '../../../stores/AuthStore';

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
    });

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
    });

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
        await nextTick(() => expect(wrapper.findAll('input[type=password]').length).toBe(2))
        await wrapper.findAll("input[type=password]")[1].setValue('pass');
        await waitForExpect(() => {
            expect(wrapper.findAll('input[type=submit]').length).toBe(1);
        })
    });

    it('inputs an available username', async () => {
        const wrapper = mount(SignUp, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
                stubs: ['FontAwesomeIcon']
            }
        });
        const usernameInput = wrapper.findAll('input')[0];
        usernameInput.trigger('focus');
        window.dispatchEvent(new Event('keydown'));
        usernameInput.setValue('NonExistingUser');
        await waitForExpect(() => {
            expect(wrapper.text()).toContain('is available')
        })
    });

    it('inputs an unavailable username', async () => {
        const wrapper = mount(SignUp, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
                stubs: ['FontAwesomeIcon']
            }
        });
        const usernameInput = wrapper.findAll('input')[0];
        usernameInput.trigger('focus');
        window.dispatchEvent(new Event('keydown'));
        usernameInput.setValue('ExistingUser');
        await waitForExpect(() => {
            expect(wrapper.text()).toContain('already taken')
        })
    });

    it('inputs mismatching passwords', async () => {
        const wrapper = mount(SignUp, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
                stubs: ['FontAwesomeIcon']
            }
        });
        let isDisabled;

        expect(wrapper.text()).toContain('Choose a username');
        await wrapper.find("input[type=text]").setValue('NewUser');
        await nextTick(() => expect(wrapper.findAll('input[type=password]').length).toBe(1))
        await wrapper.findAll("input[type=password]")[0].setValue('pass');
        await nextTick(() => expect(wrapper.findAll('input[type=password]').length).toBe(2))
        await wrapper.findAll("input[type=password]")[1].setValue('pass2');

        const inputWrapper = wrapper.find('input[type=submit]');
        isDisabled = inputWrapper.element.disabled === true;
        expect(isDisabled).toBe(true);
    });

    it('registers a new user', async () => {
        const wrapper = mount(SignUp, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
                stubs: ['FontAwesomeIcon']
            }
        });
        const authStore = useAuthenticationStore();
        await wrapper.find("input[type=text]").setValue('NewUser');
        await nextTick(() => expect(wrapper.findAll('input[type=password]').length).toBe(1))
        await wrapper.findAll("input[type=password]")[0].setValue('pass');
        await nextTick(() => expect(wrapper.findAll('input[type=password]').length).toBe(2))
        await wrapper.findAll("input[type=password]")[1].setValue('pass');
        wrapper.find('form').trigger('submit')
        await waitForExpect(() => {
            expect(authStore.authenticateUser).toHaveBeenCalled();
        })
    });

    it('tries to register an existing user', async () => {
        const wrapper = mount(SignUp, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
                stubs: ['FontAwesomeIcon']
            }
        });
        await wrapper.find("input[type=text]").setValue('ExistingUser');
        await nextTick(() => expect(wrapper.findAll('input[type=password]').length).toBe(1))
        await wrapper.findAll("input[type=password]")[0].setValue('pass');
        await nextTick(() => expect(wrapper.findAll('input[type=password]').length).toBe(2))
        await wrapper.findAll("input[type=password]")[1].setValue('pass');
        wrapper.find('form').trigger('submit')
        await waitForExpect(() => {
            expect(wrapper.text()).toContain("occurred");
        })
    });

})