<template>
    <div class="w-full h-full p-[5%] space-y-4">
        <div class="space-y-1">
            <h1 class="font-bold text-3xl">Create a new link</h1>
            <p class="text-purple-300">If you don't want your link to expire or to be password protected, leave their optionnal fields empty.</p>
        </div>
        <form class="flex flex-col space-y-4">
            <span class="flex flex-col space-y-1">
                <label>Target</label>
                <input
                    class="p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="text" placeholder="Source URL" />
            </span>
            <span class="flex flex-row w-full items-center justify-center">
                <span class="w-full flex flex-col justify-around space-y-1">
                    <label class="w-1/4">Generated link</label>
                    <span class="flex flex-row space-x-2">
                        <input
                            class="w-3/4 p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                            type="text" value="https://nuz.sh/t/Dz84" />
                        <button class="w-1/4 rounded border-2 border-purple-200 border-opacity-50">I want anothter link</button>
                    </span>
                </span>
            </span>
            <span class="flex flex-col space-y-1">
                <label>Password protected (Optionnal)</label>
                <input
                    class="w-full p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="text" placeholder="Password" />
            </span>
            <span class="flex flex-col space-y-1">
                <label>Expiration (Optionnal)</label>
                <input
                    class="w-full p-2 bg-black bg-opacity-40 rounded bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                    type="datetime-local" placeholder="Password" />
            </span>
            <input
                class="bg-transparent w-[50%] self-center text-lg text-purple-300 border border-purple-300 rounded p-2"
                type="submit" value="Create link" />
        </form>
    </div>
</template>
<script setup>
</script>