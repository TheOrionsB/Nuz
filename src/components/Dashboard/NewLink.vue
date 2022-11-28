<template>
    <div class="w-full h-full p-[5%] max-lg:space-y-3 lg:space-y-10">
        <div class="space-y-1 flex flex-col ">
            <h1 class="font-bold max-lg:text-2xl lg:text-4xl ">Create a new link</h1>
            <p class="text-purple-300  max-lg:text-lg lg:text-2xl">If you don't want your link to expire or to be password protected, leave their
                optionnal fields empty.</p>
        </div>
        <form class="flex flex-col max-lg:space-y-2 lg:space-y-4 max-lg:text-lg lg:text-xl" @submit.prevent="createLink">
            <span class="flex flex-col space-y-1">
                <label class="">Link name</label>
                <input v-model="formInputs.name.value"
                    class="max-lg:p-1 lg:p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="text" placeholder="Name" />
            </span>
            <span class="flex max-lg:flex-col max-lg:space-y-2 flex-row lg:pace-x-4">
                <span class="flex flex-col space-y-1 w-full">
                    <label class="">Target URL</label>
                    <input @focus="isTargetURLFocused = true" @blur="isTargetURLFocused = false"
                        v-model="formInputs.target.value" id="targetUrlInput"
                        class="max-lg:p-1 lg:p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                        type="text" placeholder="URL" />
                </span>
                <span class="flex max-lg:flex-col lg:flex-row w-full items-center justify-center">
                    <span class="w-full flex flex-col justify-around space-y-1">
                        <label class="">Generated link</label>
                        <span class="flex flex-row w-full space-x-2">
                            <input id="generatedUrlInput" v-model="formInputs.src.value" disabled
                                class="max-lg:p-1 lg:p-2 bg-gray-900 w-2/3 bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-gray-200 border-opacity-50"
                                type="text" />
                            <button @click="console.log('nothing')"
                                class="rounded w-1/3 border-2 border-purple-200 border-opacity-50">
                                Regen</button>
                        </span>
                    </span>
                </span>
            </span>
            <p v-if="validateFormInputs.target.value === true" class="text-purple-300">Target URL valid</p>
            <p v-if="validateFormInputs.target.value === false" class="text-red-300">Target URL invalid</p>
            <span class="flex flex-col space-y-1">
                <label class="">Password protected (Optionnal)</label>
                <input v-model="formInputs.password.value"
                    class="w-full max-lg:p-1 lg:p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="password" placeholder="Password" />
            </span>
            <span class="flex flex-col space-y-1">
                <label class="">Expiration (Optionnal)</label>
                <input v-model="formInputs.expirationDate.value"
                    class="w-full max-lg:p-1 lg:p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="datetime-local" placeholder="Password" />
            </span>
            <input
                class="bg-transparent w-[50%] self-center text-lg text-purple-300 border border-purple-300 rounded max-lg:p-1 lg:p-2"
                type="submit" value="Create link" />
            <p v-if="error" class="text-red-300">An error occurred, please check your form entries and try again</p>
            <p v-if="error === false" class="text-purple-300">Link shortened successfully !</p>
        </form>
    </div>
</template>
<script setup>
import { getNewShortened, newSignedInShortened } from '../../api/ShortenApi';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToastStore } from '../../stores/ToastStore';

const validateFormInputs = {
    target: ref(null),
}

const formInputs = {
    name: ref(""),
    target: ref(""),
    src: ref(""),
    password: ref(""),
    expirationDate: ref(""),
}
const isTargetURLFocused = ref(false);
const isLinkCreating = ref(false);
const error = ref(null);
const toastStore = useToastStore()

const router = useRouter()
let timeSinceLastInput = 0;

const verifyProvidedURL = async () => {
    // eslint-disable-next-line no-useless-escape
    const urlRegExp = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)
    if (urlRegExp.test(formInputs.target.value)) validateFormInputs.target.value = true;
    else validateFormInputs.target.value = false;
}

const createLink = async () => {
    isLinkCreating.value = true;
    const result = await newSignedInShortened(formInputs);
    if (result.success) {
        isLinkCreating.value = false;
        toastStore.setSuccess("Link created successfully !")
        router.push({ path: '/dashboard' })
    } else {
        toastStore.setError("An error occurred while creating the link");
        isLinkCreating.value = false;
    }
}
const handleKeyDown = () => {
    if (isTargetURLFocused.value) {
        clearTimeout(timeSinceLastInput);
        timeSinceLastInput = setTimeout(async () => { verifyProvidedURL(); formInputs.src.value = (await getNewShortened()).shortened }, 500);
    }

}

addEventListener('keydown', handleKeyDown);

</script>