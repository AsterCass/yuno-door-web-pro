import {createRouter, createWebHistory} from "vue-router";
import NoAuth from "@/ui/pages/NoAuth.vue";
import NotFound from "@/ui/pages/NotFound.vue";
import NoLogin from "@/ui/pages/NoLogin.vue";
import WebMain from "@/ui/pages/WebMain.vue";
import TestComponents from "@/ui/pages/TestComponents.vue";
import WebRedirect from "@/ui/pages/WebRedirect.vue";
import WebArticleDetail from "@/ui/pages/WebArticleDetail.vue";
import WebArticleList from "@/ui/pages/WebArticleList.vue";
import WebChatroom from "@/ui/pages/WebChatroom.vue";


const router = createRouter({
    // history: createWebHashHistory(process.env.BASE_URL),
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "main",
            component: WebMain,
            meta: {
                title: 'AsterCasc | Software Developer | Personal Portfolio | 秋光自挽 | 软件开发工程师 | 个人人作品集'
            },
        },
        {
            path: "/article",
            children: [
                {
                    path: 'detail',
                    name: "webArticleDetail",
                    component: WebArticleDetail,
                    meta: {
                        title: 'AsterCasc | Technical Articles'
                    },
                    props: ($route) => ({
                        articleId: $route.query.articleId,
                    }),
                },
                {
                    path: 'list',
                    name: "webArticleList",
                    component: WebArticleList,
                    meta: {
                        title: 'AsterCasc | Technical Articles'
                    },
                    props: ($route) => ({
                        authorId: $route.query.author,
                        type: $route.query.type,
                    }),
                }
            ]
        },
        {
            path: "/essay",
            children: [
                {
                    path: "list",
                    name: "mainEssayList",
                    component: WebRedirect,
                    props: () => ({
                        path: "essay/list",
                    }),
                }
            ]
        },
        {
            path: "/tools",
            children: [
                {
                    path: "list",
                    name: "mainToolsList",
                    component: WebRedirect,
                    props: () => ({
                        path: "tools/steam/search",
                    }),
                },
                {
                    path: "timestamp",
                    name: "mainToolsTimestamp",
                    component: WebRedirect,
                    props: () => ({
                        path: "tools/timestamp",
                    }),
                },
                {
                    path: "md5",
                    name: "mainToolsMd5",
                    component: WebRedirect,
                    props: () => ({
                        path: "tools/md5",
                    }),
                },
                {
                    path: "imgBase64",
                    name: "mainToolsImgBase64",
                    component: WebRedirect,
                    props: () => ({
                        path: "tools/imgBase64",
                    }),
                },
                {
                    path: "rgbHex",
                    name: "mainToolsRgbHex",
                    component: WebRedirect,
                    props: () => ({
                        path: "tools/rgbHex",
                    }),
                },
                {
                    path: "qrcode",
                    name: "mainToolsQrcode",
                    component: WebRedirect,
                    props: () => ({
                        path: "tools/qrcode",
                    }),
                },
            ]
        },
        {
            path: "/video",
            children: [
                {
                    path: "collection",
                    name: "mainVideoCollection",
                    component: WebRedirect,
                    props: () => ({
                        path: "video/collection",
                    }),
                }
            ]
        },
        {
            path: '/test',
            name: 'test',
            children: [
                {
                    path: 'components',
                    name: 'testComponents',
                    component: TestComponents,
                    meta: {
                        title: '组件测试'
                    },
                },
            ]
        },
        {
            path: "/board",
            name: "board",
            component: WebRedirect,
            props: () => ({
                path: "board",
            }),
        },
        {
            path: "/chatroom",
            name: "chatroom",
            component: WebChatroom,
            meta: {
                title: 'AsterCasc | Chatroom | 聊天室'
            },
        },
        {
            path: "/space",
            name: "space",
            component: WebRedirect,
            props: ($route) => {
                return $route.query.id ? {path: "space?id=" + $route.query.id} : {path: "space"}
            }
        },
        {
            path: "/privacy",
            name: "privacy",
            component: WebRedirect,
            props: () => ({
                path: "privacy",
            }),
        },
        {
            path: "/previous",
            name: "previous",
            component: WebRedirect,
        },
        {
            path: "/404",
            name: '404',
            component: NotFound
        },
        {
            path: "/401",
            name: '401',
            component: NoLogin
        },
        {
            path: "/403",
            name: '403',
            component: NoAuth
        },
        {
            path: "/:catchAll(.*)",
            name: "notFound",
            component: NotFound
        },
    ],
});


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

router.afterEach(() => {
    //make sure scroller site right for header style
    window.scrollTo(0, 0)
})


export function backToHome(thisRouter) {
    thisRouter.push({
        name: "main"
    })
}

export function toSpecifyPage(thisRouter, pageName) {
    thisRouter.push({
        name: pageName
    })
}

export function toSpecifyPageWithQuery(thisRouter, pageName, queryMap) {
    thisRouter.push({
        name: pageName,
        query: queryMap,
    })
}

export function toSpecifyPageWithQueryNewTab(thisRouter, pageName, queryMap) {
    const {href} = thisRouter.resolve({name: pageName, query: queryMap});
    const absoluteUrl = `${window.location.origin}${href}`;
    window.open(absoluteUrl, '_blank');
}

export function toReplacePage(thisRouter, queryMap) {
    thisRouter.replace({
        name: thisRouter.name,
        query: queryMap,
    })
}

export function toBack(thisRouter) {
    thisRouter.go(-1)
}

export default router;
