import { defineStore } from 'pinia'

interface States {
    asyncRoute: any[]
    hasMenus: boolean,
    siderIsFold: boolean,
    tagsData: any[],

    isShowBread: boolean
}
export const useStore = defineStore('storeId', {
    // 推荐使用 完整类型推断的箭头函数
    state: ():States => {
        return {
            asyncRoute: [],
            hasMenus: true,
            siderIsFold: false,
            tagsData: [
                {
                    name: "首页",
                    path: "/",
                },
            ],
            isShowBread: false
        }
    },
    getters:{
        SET_TAGS_DATA(state) {
            return state.tagsData;
        },
    },
    actions: {
        addTagsData(val: any) {
            const result = this.tagsData.findIndex((x) => x.path === val.path);
            result === -1 ? this.tagsData.push(val) : "";
        },
        closeTag(val: any) {
            const result = this.tagsData.findIndex((x) => x.path === val.path);
            this.tagsData.splice(result, 1);
        },
        closeAllTags() {
            this.tagsData = [
                {
                    name: "首页",
                    path: "/",
                },
            ];
        },
    },
})
