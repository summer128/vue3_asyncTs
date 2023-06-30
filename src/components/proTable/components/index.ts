/*
    搜索框的类型
 */
export type SearchType =
    | "input"
    | "select"
    | "tree-select"
    | "cascader"
    | "date-picker"
    | "time-picker"
    | "time-select"
    | "switch";

export type searchProps = {
    el: SearchType; // 当前项搜索框的类型
    props?: any; // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
    key?: string; // 当搜索项 key 不为 prop 属性时，可通过 key 指定
    order?: number; // 搜索项排序（从大到小）
    span?: number; // 搜索项所占用的列数，默认为1列
    offset?: number; // 搜索字段左侧偏移列数
    defaultValue?: string | number | boolean | any[]; // 搜索项默认值
    disabled?: boolean; // 是否禁止
    options?: any[]
}

export interface ColumnProps {
    type?: string
    prop?: string
    fixed?: string
    isShow?: boolean
    label?: string
    fieldNames?: any
    search?:searchProps | undefined // 搜索项配置
    props?: any
    width?: number
    order?: number
}
