<template>
    <div class="flex flex-col h-full w-full items-center">
        <div class="h-92 flex px-[10%] flex-row w-3/4 pt-24 justify-center text-white p-10">
            <div class="flex flex-col justify-center items-center p-10 w-2/6 bg-purple-900 text-white bg-opacity-90 space-y-4">
                <h2 class="text-3xl font-bold">Welcome back!</h2>
            </div>
            <form class="flex flex-col p-8 justify-center  w-4/6  bg-gray-500 bg-opacity-20 ">
                <span class="flex flex-col h-full justify-around space-y-4">
                    <span class="flex flex-col space-y-2">
                        <label class="font-bold text-xl">Username</label>
                        <input
                            class="p-2 bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                            type="text" placeholder="Username" />
                    </span>
                    <span class="flex flex-col space-y-2">
                        <label class="font-bold text-xl">Password</label>
                        <input
                            class="p-2 bg-transparent text-purple-300 border-2 border-purple-200 border-opacity-50"
                            type="password" placeholder="Password" />
                    </span>
                    <input
                        class="bg-transparent w-[50%] self-center text-xl text-purple-300 border border-purple-300 rounded p-3"
                        type="submit" value="Login" />
                </span>
            </form>
        </div>
    </div>
</template>
<script setup></script>