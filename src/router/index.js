import {createRouter, createWebHistory} from "vue-router";
import NoAuth from "@/ui/pages/NoAuth.vue";
import NotFound from "@/ui/pages/NotFound.vue";
import NoLogin from "@/ui/pages/NoLogin.vue";
import WebMain from "@/ui/pages/WebMain.vue";
import TestComponents from "@/ui/pages/TestComponents.vue";
import WebRedirect from "@/ui/pages/WebRedirect.vue";
import {openLink} from "@/utils/base-tools";
import WebArticleDetail from "@/ui/pages/WebArticleDetail.vue";


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
                    path: "list",
                    name: "mainArticleList",
                    component: WebRedirect,
                    beforeEnter() {
                        openLink('https://www.astercasc.com/article/list', false)
                    },
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
                    beforeEnter() {
                        openLink('https://www.astercasc.com/essay/list', false)
                    },
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
                    beforeEnter() {
                        openLink('https://www.astercasc.com/tools/steam/search', false)
                    },
                },
                {
                    path: "timestamp",
                    name: "mainToolsTimestamp",
                    component: WebRedirect,
                    beforeEnter() {
                        openLink('https://www.astercasc.com/tools/timestamp', false)
                    },
                },
                {
                    path: "md5",
                    name: "mainToolsMd5",
                    component: WebRedirect,
                    beforeEnter() {
                        openLink('https://www.astercasc.com/tools/md5', false)
                    },
                },
                {
                    path: "imgBase64",
                    name: "mainToolsImgBase64",
                    component: WebRedirect,
                    beforeEnter() {
                        openLink('https://www.astercasc.com/tools/imgBase64', false)
                    },
                },
                {
                    path: "rgbHex",
                    name: "mainToolsRgbHex",
                    component: WebRedirect,
                    beforeEnter() {
                        openLink('https://www.astercasc.com/tools/rgbHex', false)
                    },
                },
                {
                    path: "qrcode",
                    name: "mainToolsQrcode",
                    component: WebRedirect,
                    beforeEnter() {
                        openLink('https://www.astercasc.com/tools/qrcode', false)
                    },
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
                    beforeEnter() {
                        openLink('https://www.astercasc.com/video/collection', false)
                    },
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
            beforeEnter() {
                openLink('https://www.astercasc.com/board', false)
            },
        },
        {
            path: "/privacy",
            name: "privacy",
            component: WebRedirect,
            beforeEnter() {
                openLink('https://www.astercasc.com/privacy', false)
            },
        },
        {
            path: "/previous",
            name: "previous",
            component: WebRedirect,
            beforeEnter() {
                openLink('https://www.astercasc.com', false)
            },
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
