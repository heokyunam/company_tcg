import { defineStore } from "pinia";

export const usePlayer = defineStore('player', () => {
    const player = reactive({
        heart: 5,
        gold: 10,
    })

    return {
        player
    }
})