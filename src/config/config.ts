export interface IConfig {
    env: string // 开发环境
    mock?: boolean // mock数据
    title: string // 项目title
    baseApi?: string // api请求地址
    mockApi?: string // mock地址
}

const dev: IConfig = {
    env: "development",
    mock: false,
    title: "开发",
    baseApi: "/api", // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
    mockApi: "https://www.fastmock.site/mock/4f8c864d98d32e623e4a452a904ca70b/api"
}

const prod: IConfig = {
    env: "production",
    mock: false,
    title: "生产",
    baseApi: "https://www.baidu.com/api", // 正式api请求地址
    mockApi: 'xxx'
}

export const config: IConfig = import.meta.env.MODE == 'development' ? dev : prod;