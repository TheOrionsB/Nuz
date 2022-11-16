import { mount } from '@vue/test-utils';
import SignIn from '../../Authentication/SignIn.vue';
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestingPinia } from '@pinia/testing'

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
    useRouter: vi.fn()
}));

describe('SignInComponent', () => {
    it('s initial render is correct', () => {
        const wrapper = mount(SignIn, {
            global: {
                plugins: [ createTestingPinia({ createSpy: vi.fn }) ],
                stubs: ['FontAwesomeIcon']
            }
        });
        expect(wrapper.text()).toContain("Who are you ?")
        expect(wrapper.findAll("input").length).toBe(1);
    })
    it('s form develops to stage 2', () => {
        const wrapper = mount(SignIn, {
            global: {
                plugins: [ createTestingPinia({ createSpy: vi.fn }) ],
                stubs: ['FontAwesomeIcon']
            }
        });
        const textInput = wrapper.find('input[type=text]');
        textInput.setValue('test');
        setTimeout(() => {
            expect(wrapper.findAll("input[type=password]").length).toBe(1);
        }, 1)
    })
    it('s form develops to stage 3', () => {
        const wrapper = mount(SignIn, {
            global: {
                plugins: [ createTestingPinia({ createSpy: vi.fn }) ],
                stubs: ['FontAwesomeIcon']
            }
        });
        const textInput = wrapper.find('input[type=text]');
        textInput.setValue('test');
        let passwordInput;
        setTimeout(() => {
            passwordInput = wrapper.find('input[type=password]');
            passwordInput.setValue("test");
        }, 1)
        setTimeout(() => {
            expect(wrapper.findAll("input[type=submit]").length).toBe(1);
        }, 1)
    })
    it('Logs in correctly', () => {
        
    })
})