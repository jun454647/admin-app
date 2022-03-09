import { defineStore } from "pinia";
import Config from "@/config/website"

export const useConfig = defineStore({
    id: "config",
    state: ()=> ({
        collapse: Config.collapse
    }),
    actions: {
        setCollapse (bol: any) {
            this.collapse = bol;
        }
    }
})