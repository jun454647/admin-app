import { defineStore } from "pinia";

export const useConfig = defineStore({
    id: "config",
    state: ()=> ({
        collapse: false
    }),
    actions: {
        setCollapse (bol: any) {
            this.collapse = bol;
        }
    }
})