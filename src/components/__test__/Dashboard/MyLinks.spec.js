import { mount } from '@vue/test-utils';
import MyLinks from '../../../components/Dashboard/MyLinks.vue';
import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from '@pinia/testing'
import waitForExpect from 'wait-for-expect';
import { getShortened } from '../../../api/ShortenApi.js';

vi.mock('../../../api/ShortenApi.js', () => ({
    getShortened: vi.fn(() => {
        return ({
            shortened: [
                {
                    name: "Stackoverflow response #1",
                    createdAt: new Date(),
                    isExpiringEnabled: false,
                    source: "YmEBI280",
                    target: "https://stackoverflow.com/questions/48965709/how-to-find-string-in-array-using-mongoose",
                    stats: {
                        hitHistory: [],
                        lastHit: new Date(),
                        nHit: 0
                    },
                    passwordProtected: false,
                    expiresAt: null,
                    password: null
                },
            ]
        })
    })
}))

const ShortenedTexts = ['Stackoverflow response #1', 'stackoverflow.com']

describe('MyLinks component', () => {
    it('Renders correctly', () => {
        const wrapper = mount(MyLinks, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn() })],
                stubs: ["FontAwesomeIcon"]
            }
        })
        expect(wrapper.findAll('input').length).toBe(1);
    });

    it('Fetches all shortened links and renders them', async () => {
        const wrapper = mount(MyLinks, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn() })],
                stubs: ["FontAwesomeIcon"],
            }
        })
        await waitForExpect(() => {
            expect(getShortened).toHaveBeenCalled();
            expect(wrapper.findAll('li').length).toBe(1);
            expect(wrapper.findAll('button').length).toBe(2);
            expect(wrapper.findAll('a').length).toBe(2);
            for (let shortenedText in ShortenedTexts) {
                expect(wrapper.text()).toContain(ShortenedTexts[shortenedText]);
            }
        })
    })
})