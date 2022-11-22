<template>
    <div class="w-full h-full overflow-y-scroll p-8 space-y-8">
        <div class="flex flex-row justify-between items-center">
            <div class="px-8 w-1/2">
                <span class="flex flex-row space-x-2">
                    <h2 class="text-5xl font-extralight">Account: </h2>
                    <h2 class="text-5xl font-extralight  text-purple-400">{{ authStore.getUsername() }}</h2>
                </span>
                <h3 class="text-2xl font-extralight">This is you :)</h3>
            </div>
            <div class="text-2xl w-1/2 bg-gray-800 rounded-md p-4 ">
                <span class="flex flex-row w-full justify-start space-x-2">
                    <h4 class="font-extralight">Username:</h4>
                    <p class="text-purple-400">{{ info.data.username }}</p>
                </span>
                <span class="flex flex-row w-full justify-start space-x-2">
                    <h4 class="font-extralight">Recovery key set up:</h4>
                    <p class="text-purple-400">{{ info.data.hasRecoveryKey ? 'Yes' : 'No' }}</p>
                </span>
                <span class="flex flex-row w-full justify-start space-x-2">
                    <h4 class="font-extralight">Number of links registered:</h4>
                    <p class="text-purple-400">{{ info.data.nShortens }}</p>
                </span>
                <span class="flex flex-row w-full justify-start space-x-2">
                    <h4 class="font-extralight">Account at risk:</h4>
                    <p class="text-purple-400">{{ info.data.hasRecoveryKey ? 'No' : 'Yes (no recovery key)' }}</p>
                </span>
            </div>
        </div>
        <div class="space-y-8">
            <h3 class="text-2xl font-extralight">What do you want to do today ?</h3>
            <div class="w-full flex flex-row justify-center space-x-2">
                <button
                    :class="componentState === 'PasswordReset' ? 'bg-purple-300 text-black' : 'bg-purple-700 text-white'"
                    @click="componentState = 'PasswordReset'"
                    class="p-2 hover:bg-purple-300 hover:text-black duration-150 ease-in-out rounded text-xl w-1/4 flex flex-row justify-start items-center space-x-1">
                    <font-awesome-icon class="w-1/6" :icon="['fas', 'lock']" />
                    <p>Change my password</p>
                </button>
                <button @click="componentState = 'RecoveryRequest'"
                    :class="componentState === 'RecoveryRequest' ? 'bg-purple-300 text-black' : 'bg-purple-700 text-white'"
                    class="p-2 hover:bg-purple-300 hover:text-black duration-150 ease-in-out rounded text-xl w-1/4 flex flex-row justify-start items-center space-x-1">
                    <font-awesome-icon class="w-1/6" :icon="['fas', 'key']" />
                    <p>Setup recovery key</p>
                </button>
                <button @click="isAccDeletionModalVisible = !isAccDeletionModalVisible"
                    class="p-2 bg-red-700 hover:bg-red-300 hover:text-black duration-150 ease-in-out rounded text-xl w-1/4 flex flex-row justify-start items-center space-x-1">
                    <font-awesome-icon class="w-1/6" :icon="['fas', 'trash']" />
                    <p>Delete my account</p>
                </button>
            </div>
        </div>
        <div>
            <component
                :is="AccountActions[AccountActions.findIndex((item) => item.name === componentState)].component" />
        </div>
        <CustomModal :visible="isAccDeletionModalVisible">
            <div class="h-full w-full flex flex-col items-center justify-between p-4">
                <div class="text-center space-y-2">
                    <h1 class="text-red-500 text-4xl font-bold">Are you sure you want to delete your account ?
                    </h1>
                    <p class="text-red-400 text-xl">If you confirm this action, your account as well as all of the links
                        you have generated will be permanently deleted from Nuz.</p>
                    <p class="text-red-400 text-xl">This action cannot be undone. Proceed with caution.</p>
                </div>
                <div class="flex flex-row space-x-2 justify-center w-full">
                    <button @click="deleteActiveAccount()"
                        class="p-2 bg-red-700 hover:bg-red-300 hover:text-black duration-150 ease-in-out rounded text-xl w-1/4 flex flex-row justify-start items-center space-x-1">
                        <font-awesome-icon class="w-1/6" :icon="['fas', 'trash']" />
                        <p>Delete my account</p>
                    </button>
                    <button @click="isAccDeletionModalVisible = !isAccDeletionModalVisible"
                        class="p-2 bg-purple-700 hover:bg-purple-300 hover:text-black duration-150 ease-in-out rounded text-xl w-1/4 flex flex-row justify-start items-center space-x-1">
                        <font-awesome-icon class="w-1/6" :icon="['fas', 'right-from-bracket']" />
                        <p>Nevermind</p>
                    </button>
                </div>
            </div>
        </CustomModal>
    </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import { useAuthenticationStore } from '../../stores/AuthStore';
import { deleteAccount, getBasicInfo } from '../../api/UsersApi';
import EditPassword from './AccountActions/EditPassword.vue'
import GetRecovery from './AccountActions/GetRecovery.vue';
import CustomModal from '../Modals/CustomModal.vue';
import { useRouter } from 'vue-router';

const authStore = useAuthenticationStore();
const info = ref({});
const componentState = ref("none")
const router = useRouter();
const isAccDeletionModalVisible = ref(false);

const deleteActiveAccount = async () => {
    const response = await deleteAccount();
    if (response) {
        authStore.authenticateUser("", "");
        router.push('/');
    } else {
        console.log("Oops, could not delete the account");
    }
}

const AccountActions = [
    { name: 'PasswordReset', component: EditPassword },
    { name: 'RecoveryRequest', component: GetRecovery },
    { name: 'none', component: null }
]

onBeforeMount(async () => {
    info.value = await getBasicInfo();
})
</script>