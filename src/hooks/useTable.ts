import {reactive,toRefs} from 'vue'
import type {FormInstance} from 'element-plus'
interface Pageable {
    pageNum: number;
    pageSize: number;
    total: number;
}
interface AsyncTableType {
    asyncTableData: Array<any>
    pageable:Pageable
    searchParam: {
        [key: string]: any
    }
    searchInitParam: {
        [key:string]: any
    }
}

export const useTable = () => {
/*
定义数据
*/
    const state = reactive<AsyncTableType>({
        // 分页数据
        pageable: {
            // 当前页数
            pageNum: 1,
            // 每页显示条数
            pageSize: 10,
            // 总条数
            total: 0
        },
        // 搜索参数
        searchParam: { },
        // 初始化默认的查询参数
        searchInitParam: { },
        // 表格动态-数据
        asyncTableData: [
            {
                username: '田文静',
                gender: '女',
                age: '18',
                idCard: '11230',
                email: '123@qq.com',
                address: '北京天桥',
                status: '0',
                createTime: '2023-3-7'
            }
        ]
    })

    /*
    公共搜索-事件
     */
    const searchFn = () => {
        console.log('打印的搜索参数：：：',state.searchParam)
    }
    /*
    清楚-按钮
     */
    const resetFn = () => {
        console.log('0000')
        state.searchParam = {};
        // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
        Object.keys(state.searchInitParam).forEach(x => {
            state.searchParam[x] = state.searchInitParam[x]
        })
    }

    return {
        ...toRefs(state),
        searchFn,
        resetFn
    }
}
