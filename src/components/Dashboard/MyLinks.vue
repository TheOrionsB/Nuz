<template>
    <div class="flex flex-col h-full w-full overflow-y-scroll p-[5%] space-y-4">
        <div class="space-y-1 flex flex-col self-start">
            <h1 class="font-bold text-4xl ">My links</h1>
            <p class="text-purple-300 text-2xl">Find every link you have registered. You can delete them, copy the link
                in your clipboard and access the target link</p>
        </div>
        <div
            class="w-[90%] focus:outline-none focus:border-none focus:outline-purple-400 text-lg bg-transparent flex flex-row items-center border-b-purple-400 border-b p-4 text-purple-300">
            <font-awesome-icon class="text-opacity-50 text-gray-500 w-14" :icon="['fas', 'magnifying-glass']" />
            <input id="search" ref="searchRef" @change="logValue" v-model="searchInput" type="text"
                class="w-full border-none bg-transparent outline-none"
                placeholder="Search links... (⌘+K or Windows+K) " />
        </div>
        <div class="w-full p-4 text-xl">
            <ul class="space-y-2">
                <li class="flex flex-row items-center justify-between border-b border-b-gray-800 last-of-type:border-none p-2"
                    v-for="(item, index) in shortenedList" :key="index">
                    <div class="flex flex-row w-2/3 justify-start space-x-4">
                        <p class="w-1/2">{{ item.name }}</p>
                        <div class="max-sm:hidden flex w-1/2 flex-row">
                            <a class=" underline text-purple-500" v-bind:href="genFullLink(item.source)">{{
                                    item.target.split('/')[2].length > 20 ? item.target.split('/')[2].slice(0,20) + '...' : item.target.split('/')[2]
                            }}</a>
                        </div>
                    </div>
                    <div class="space-x-2 class flex flex-row w-2/5 justify-end">
                        <button @click="copyToClipBoard(genFullLink(item.source))"
                            class="bg-purple-700 rounded hover:bg-purple-300 hover:text-black duration-150 ease-in-out p-2 w-1/4 text-center text-lg">
                            <font-awesome-icon :icon="['fas', 'copy']" />
                        </button>
                        <a target='_blank' :href="genFullLink(item.source)"
                            class="bg-purple-700 rounded hover:bg-purple-300 hover:text-black duration-150 ease-in-out p-2 w-1/4 text-center text-lg">
                            <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" />
                        </a>
                        <button @click="initiateDeleteModal(item.source), isModalVisible = !isModalVisible"
                            class="bg-red-700 rounded hover:bg-red-300 hover:text-black duration-150 ease-in-out p-2 w-1/4 text-center text-lg">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </button>
                    </div>
                </li>
            </ul>
            <CustomModal :visible="isModalVisible">
                <div class="h-full w-full flex flex-col items-center justify-between p-4">
                    <h2 class="text-red-500 text-4xl font-bold">Hol up ! Are you sure about that ?</h2>
                    <p class="text-red-400 text-xl">Once deleted, this link will redirect to a Nuz 404 page until
                        reassigned randomly.</p>
                    <ul class="list-disc">
                        <li class="text-xl flex flex-row space-x-2">
                            <p>Source:</p>
                            <a class="text-purple-400">{{ genFullLink(modalContent.source.value) }}</a>
                        </li>
                        <li class="text-xl flex flex-row space-x-2">
                            <p>Target:</p>
                            <a class="text-purple-400">{{ modalContent.target.value }}</a>
                        </li>
                        <li class="text-xl flex flex-row space-x-2">
                            <p>Hits:</p>
                            <p class="text-purple-400">{{ modalContent.hits.value }}</p>
                        </li>
                    </ul>
                    <p class="text-red-400 text-xl">Are you sure you want to proceed ?</p>
                    <div class="flex flex-row space-x-2 justify-center w-full">
                        <button @click="confirmLinkDeletion(modalContent.source.value)"
                            class="p-2 bg-red-700 hover:bg-red-300 hover:text-black duration-150 ease-in-out rounded text-xl w-1/4 flex flex-row justify-start items-center space-x-1">
                            <font-awesome-icon class="w-1/6" :icon="['fas', 'trash']" />
                            <p>Delete this link</p>
                        </button>
                        <button @click="isModalVisible = !isModalVisible"
                            class="p-2 bg-purple-700 hover:bg-purple-300 hover:text-black duration-150 ease-in-out rounded text-xl w-1/4 flex flex-row justify-start items-center space-x-1">
                            <font-awesome-icon class="w-1/6" :icon="['fas', 'right-from-bracket']" />
                            <p>Nevermind</p>
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    </div>
</template>
<script setup>
import { deleteShortened, getShortened } from '../../api/ShortenApi';
import { onMounted, ref } from 'vue';
import CustomModal from '../Modals/CustomModal.vue';
import { useToastStore } from '../../stores/ToastStore';

const toastStore = useToastStore()
const searchInput = ref(null);
const searchRef = ref(null);
const shortenedList = ref([]);

const isModalVisible = ref(false);

const modalContent = {
    source: ref(""),
    target: ref(""),
    hits: ref(0),
}

const initiateDeleteModal = (toDelete) => {
    console.log("true");
    const shortenIdx = shortenedList.value.findIndex((item) => item.source === toDelete);
    if (shortenIdx !== -1) {
        modalContent.source.value = toDelete;
        modalContent.target.value = shortenedList.value[shortenIdx].target;
        modalContent.hits.value = shortenedList.value[shortenIdx].stats.nHit;
    } else {
        console.log("god damnit")
    }
}

const confirmLinkDeletion = async (source) => {
    const success = await deleteShortened(source);
    if (success) {
        isModalVisible.value = !isModalVisible.value;
        shortenedList.value = await (await getShortened()).shortened;
        toastStore.setSuccess("Link deleted!")
    } else {
        toastStore.setError("An error occurred while deleting the link");
        console.log("error");
    }
}

const genFullLink = (suffix) => {
    return `${process.env.VUE_APP_REDIRECTION_BASEURL}/${suffix}`;
}
const copyToClipBoard = (item) => {
    toastStore.setSuccess("Link copied to your clipboard!")
    navigator.clipboard.writeText(item)
}

onMounted(async () => {
    document.addEventListener('keydown', (event) => {
        if (event.metaKey) {
            document.addEventListener('keydown', (e) => {
                if (e.code === "KeyK") {
                    searchRef.value.focus();
                }
            })
        }
    });
    shortenedList.value = await (await getShortened()).shortened
})
</script>