import { mount } from '@vue/test-utils';
import SignIn from '../../Authentication/SignIn.vue';
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
import { useAuthenticationStore } from '../../../stores/AuthStore';
import { useRouter } from 'vue-router';

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
    resolve: vi.fn,
    useRouter: () => ({
        push: mockPush
    }),

}));
const router = useRouter();

describe('SignInComponent', () => {
    it('s initial render is correct', () => {
        const wrapper = mount(SignIn, {
            global: {
                stubs: ['FontAwesomeIcon'],
                plugins: [createTestingPinia({ createSpy: vi.fn })],

            }
        });
        expect(wrapper.text()).toContain("Who are you ?")
        expect(wrapper.findAll("input").length).toBe(1);
    })
    it('s form develops to stage 2', () => {
        const wrapper = mount(SignIn, {
            global: {
                stubs: ['FontAwesomeIcon'],
                plugins: [createTestingPinia({ createSpy: vi.fn })],

            }
        });
        const textInput = wrapper.find('input[type=text]');
        textInput.setValue('test');
        setTimeout(() => {
            expect(wrapper.findAll("input[type=password]").length).toBe(1);
        }, 1)
    })
    it('s form develops to stage 3', async () => {
        const wrapper = mount(SignIn, {
            global: {
                stubs: ['FontAwesomeIcon'],
                plugins: [createTestingPinia({ createSpy: vi.fn })],

            }
        });
        wrapper.find('input[type=text]').setValue('test');
        await nextTick(() => {
            wrapper.find('input[type=password]').setValue("test");
        })
        await nextTick(() => {
            expect(wrapper.findAll("input[type=submit]").length).toBe(1);
        })
    })
    it('Logs in correctly', async () => {
        const wrapper = mount(SignIn, {
            global: {
                stubs: ['FontAwesomeIcon'],
                plugins: [createTestingPinia({ createSpy: vi.fn })],
            }
        });
        const authStore = useAuthenticationStore()
        await wrapper.find("input[type=text]").setValue('correctUser');
        await nextTick(() => { wrapper.find('input[type=password]').setValue('correctPass') })
        await nextTick(() => { wrapper.find('form').trigger('submit') });
        expect(authStore.authenticateUser).toHaveBeenCalled();
    })
})