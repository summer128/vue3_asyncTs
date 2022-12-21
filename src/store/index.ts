import { defineStore } from 'pinia'

interface States {
    asyncRoute: any[]
    hasMenus: boolean
}
export const useStore = defineStore('storeId', {
    // 推荐使用 完整类型推断的箭头函数
    state: ():States => {
        return {
            asyncRoute: [],
            hasMenus: true
        }
    },
})