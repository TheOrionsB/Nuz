import { mount } from '@vue/test-utils';
import SignIn from '../../Authentication/SignIn.vue';
import { beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from 'pinia'

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
    useRouter: vi.fn()
}));


describe('SignInComponent', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    })
    it('s initial render is correct', () => {
        const wrapper = mount(SignIn);
        expect(wrapper.text()).toContain("Who are you ?")
        expect(wrapper.findAll("input").length).toBe(1);
    })
    // it('s form develops to stage 2', () => {
    //     const wrapper = mount(SignIn);
    //     const textInput = wrapper.find('input[type=text]');
    //     textInput.setValue('test');
    //     wrapper.find('input[type="password"').setValue("yes");
    //     console.log(wrapper.text())
    // })
})