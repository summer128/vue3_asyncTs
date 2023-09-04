
export interface LoginFormInt {
    username: string,
    password: string,
    roleId?: number
}

// 定义规则
interface Rules {
    password: {trigger: string, message: string, required: boolean}[],
    username: {trigger: string, message: string, required: boolean}[]
    roleId: {trigger: string, message: string, required: boolean}[]
}

/*
 通过class 类定义reactive的具体某一个对象的类型
 使用时： let data = reactive(new LoginData())
 */
export class LoginData {
    ruleForm:LoginFormInt = {
        username: "",
        password: ""
    }
    rules:Rules = {
        username: [
            {
                required: true,
                message: '请输入用户名！',
                trigger: 'change',
            },
        ],
        password: [
            {
                required: true,
                message: '请输入密码！',
                trigger: 'change',
            },
        ],
        roleId: [
            {
                required: true,
                message: '请选择登陆的角色！',
                trigger: 'change',
            },
        ],
    }
}


