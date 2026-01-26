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
import WebTools from "@/ui/pages/WebTools.vue";
import CaskToolsSql2kotlin from "@/ui/views/CaskToolsSql2kotlin.vue";
import CaskToolsCnIdCard from "@/ui/views/CaskToolsCnIdCard.vue";
import CaskToolsRgbHex from "@/ui/views/CaskToolsRgbHex.vue";
import CaskToolsImageBase64 from "@/ui/views/CaskToolsImageBase64.vue";
import CaskToolsMd5 from "@/ui/views/CaskToolsMd5.vue";
import CaskToolsQrcode from "@/ui/views/CaskToolsQrcode.vue";
import CaskToolsTimestamp from "@/ui/views/CaskToolsTimestamp.vue";
import WebGuestbook from "@/ui/pages/WebGuestbook.vue";
import WebAuthLogin from "@/ui/pages/WebAuthLogin.vue";
import WebSpace from "@/ui/pages/WebSpace.vue";
import WebVideoCollection from "@/ui/pages/WebVideoCollection.vue";
import WebVideoPlay from "@/ui/pages/WebVideoPlayer.vue";
import WebPlay from "@/ui/pages/WebPlay.vue";
import WebVideoStream from "@/ui/pages/WebVideoStream.vue";


const router = createRouter({
    // history: createWebHashHistory(process.env.BASE_URL),
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "main",
            component: WebMain,
            meta: {
                title: 'AsterCasc | Software Developer | Personal Portfolio | 将军的鱿鱼炒面 | 软件开发工程师 | 个人人作品集'
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
                        title: 'AsterCasc | Articles | 文章列表'
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
                        title: 'AsterCasc | Article | 文章详情'
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
            name: 'mainTools',
            component: WebTools,
            children: [
                {
                    path: '',
                    name: 'mainToolsList',
                    redirect: {name: 'mainToolsSql2kotlin'}
                },
                {
                    path: "code/sql2kotlin",
                    name: "mainToolsSql2kotlin",
                    component: CaskToolsSql2kotlin,
                    meta: {
                        title: 'DDL to Kotlin Data Class Converter | DDL语句转Kotlin数据类工具'
                    },
                },
                {
                    path: "timestamp",
                    name: "mainToolsTimestamp",
                    component: CaskToolsTimestamp,
                    meta: {
                        title: 'Timestamp Format Converter | 时间戳格式转换工具'
                    },
                },
                {
                    path: "qrcode",
                    name: "mainToolsQrcode",
                    component: CaskToolsQrcode,
                    meta: {
                        title: 'QR Code Decoder | QR Code Generator | 二维码解析工具 | 二维码生成工具'
                    },
                },
                {
                    path: "md5",
                    name: "mainToolsMd5",
                    component: CaskToolsMd5,
                    meta: {
                        title: 'MD5 | String Data Encryption | 字符串数据加密'
                    },
                },
                {
                    path: "imgBase64",
                    name: "mainToolsImgBase64",
                    component: CaskToolsImageBase64,
                    meta: {
                        title: 'Image Base64 Converter | 图片Base64转换工具'
                    },
                },
                {
                    path: "rgbHex",
                    name: "mainToolsRgbHex",
                    component: CaskToolsRgbHex,
                    meta: {
                        title: 'RGB and Hex Color Format Converter | RGB和十六进制颜色格式互转'
                    },
                },
                {
                    path: "cnIdCard",
                    name: "mainToolsCnIdCard",
                    component: CaskToolsCnIdCard,
                    meta: {
                        title: 'Chinese Mainland ID Card Generator | 在线身份证生成'
                    },
                },
            ]
        },
        {
            path: "/tools",
            children: [
                {
                    path: "steam/search",
                    name: "mainToolsSteamSearch",
                    component: WebRedirect,
                    props: () => ({
                        path: "tools/steam/search",
                    }),
                },
                {
                    path: "mkHtmlPdf",
                    name: "mainToolsMkHtmlPdf",
                    component: WebRedirect,
                    props: () => ({
                        path: "tools/mkHtmlPdf",
                    }),
                },
            ]
        },
        {
            path: "/video",
            children: [

                {
                    path: '',
                    name: 'collection',
                    redirect: {name: 'mainVideoCollection'}
                },
                {
                    path: "collection",
                    name: "mainVideoCollection",
                    component: WebVideoCollection,
                    meta: {
                        title: 'Video Collection | 视频集合'
                    },
                },
                {
                    path: 'play',
                    name: 'mainVideoPlay',
                    component: WebVideoPlay,
                    meta: {
                        title: 'Video Player | 视频播放'
                    },
                    props: ($route) => ({
                        colId: $route.query.colId,
                        vdoId: $route.query.vdoId,
                    }),
                },
                {
                    path: 'stream',
                    name: 'mainVideoStream',
                    component: WebVideoStream,
                    meta: {
                        title: 'Video Stream | 视频直播'
                    },
                    props: ($route) => ({
                        streamId: $route.query.streamId,
                    }),
                },
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
                        title: 'AsterCasc | Test Components'
                    },
                },
            ]
        },
        {
            path: "/board",
            name: "board",
            component: WebGuestbook,
            meta: {
                title: 'AsterCasc | Guestbook | 留言板'
            },
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
            path: "/play",
            name: "play",
            component: WebPlay,
            meta: {
                title: 'AsterCasc | Play | 小游戏'
            },
        },
        {
            path: '/space',
            name: "space",
            component: WebSpace,
            meta: {
                title: 'AsterCasc | User Space'
            },
            props: ($route) => ({
                id: $route.query.id,
            }),
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
            path: "/auth",
            name: 'mainAuth',
            children: [
                {
                    path: "google/callback",
                    name: "authGoogleCallback",
                    component: WebAuthLogin,
                    meta: {
                        title: 'Auth Callback | 鉴权回调',
                    },
                    props: ($route) => ({
                        code: $route.query.code,
                        brand: 'google',
                    }),
                },
                {
                    path: "github/callback",
                    name: "authGithubCallback",
                    component: WebAuthLogin,
                    meta: {
                        title: 'Auth Callback | 鉴权回调',
                    },
                    props: ($route) => ({
                        code: $route.query.code,
                        brand: 'github',
                    }),
                },
            ]
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

export function toSpecifyPageWithState(thisRouter, pageName, state) {
    thisRouter.push({
        name: pageName,
        state: state,
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
