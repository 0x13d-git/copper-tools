export default interface ISiteContext {
    RootUrl: string,
    Auth: {
        User: {
            email: string,
            user: any,
            login: () => void,
            logout: () => void,
            update: () => void,
            refresh: () => void
        }
    },
    Crud: {

    },
    Log: {},
    Notify: {
        show: () => void,
        hide: () => void,
        update: () => void
    },
    Persist: {
        push: () => void,
        pull: () => void
    },
    Theme: {
        dark: any,
        light: any
    },
    Shell: {
        Header: {},
        LeftNav: {},
        Footer: {}
    },
    State: {}
}