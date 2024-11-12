import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useGlobalStateStore = defineStore('globalState', () => {
    const curThemeName = ref('light');

    const updateTheme = (newThemeName) => {
        curThemeName.value = newThemeName;
    }

    return { curThemeName, updateTheme };
});