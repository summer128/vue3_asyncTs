import { defineStore } from 'pinia'

interface States {
    asyncRoute: any[],
    staticRouter: any[],
    hasMenus: boolean,
    siderIsFold: boolean,
    openPageTags: any[],
    isShowBread: boolean
}
export const useMenu = defineStore('menuId', {
    // 推荐使用 完整类型推断的箭头函数
    state: ():States => {
        return {
            asyncRoute: [],
            staticRouter: [],
            hasMenus: true,
            siderIsFold: false,
            openPageTags: [], // 用于标签页,
            isShowBread: true
        }
    },
    getters:{
        SET_TAGS_DATA(state) {
            return state.openPageTags;
        },
    },
    actions: {
        addTagsData(val: any) {
            const result = this.openPageTags.findIndex((x) => x.path === val.path);
            result === -1 ? this.openPageTags.push(val) : "";
        },
        delCurrentPageTags(val: number) {
            // const result = this.openPageTags.findIndex((x) => x.path === val.path);
            this.openPageTags.splice(val, 1);
        },
        closeAllTags() {
            this.openPageTags = [];
        },

    },
})
