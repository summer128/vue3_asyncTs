# Vue 3.2 + TypeScript + Pinia + Vite3 + Element-Plus 管理系统 🎉🎉
```text

```
##interface 接口
```text
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any; 接收任意类型
}
```



## Property 'author' does not exist on type 'never'.
```text
保错：TS2339: Property 'author' does not exist on type 'never'.
    1.将对象设置成 any
    this.targetArray = this.options.find((item:any) => {
        return item.articleId == val;
    })
    2.通过字符方式获取对象属性
    this.targetArray = this.options.find((item) => {
        return item["articleId"] == val;
    });
    3.声明断言，强制执行
    this.targetArray = this.options.find((item) => {
        return (item as any).articleId == val;
    });
```
