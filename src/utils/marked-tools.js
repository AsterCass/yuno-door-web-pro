import {marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from "highlight.js";
import {gfmHeadingId} from "marked-gfm-heading-id";
import {sleep} from "@/utils/base-tools";

marked.use(markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
        //correct
        lang = lang === 'mysql' ? 'sql' : lang
        lang = lang === 'sh' ? 'powershell' : lang
        lang = lang === 'shell' ? 'powershell' : lang
        // //convert
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, {language}).value;
    }
}));
marked.use(gfmHeadingId({}));
marked.use({
    mangle: false,
    headerIds: false
});

export {
    marked
}

// 代码样式选择 https://highlightjs.org/static/demo/
// copy from node_modules/highlight.js/styles/
const styleEnums = [
    'androidstudio',
    'lioshi',
]

const styleEnumsLight = [
    'panda-syntax-light',
    'tokyo-night-light',
]

export function importStyle() {
    const random = Math.floor(Math.random() * 10000)
    const randomStyle = styleEnums[random % styleEnums.length]
    setHighlightStyle(randomStyle)
}

export function importStyleLight() {
    const random = Math.floor(Math.random() * 10000)
    const randomStyle = styleEnumsLight[random % styleEnumsLight.length]
    setHighlightStyle(randomStyle)
}

export function setHighlightStyle(styleName) {
    const linkId = 'hljs-theme-link';
    const href = `/style/${styleName}.css`;

    let link = document.getElementById(linkId);

    if (link) {
        // 已存在则直接替换 href
        if (link.href.endsWith(href)) {
            return;
        }
        link.href = href;
    } else {
        // 不存在则创建新的 link
        link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
}

export function headToHtmlTag(meta) {
    let heads = meta.articleChildTitleList;
    let headTags = []
    if (null !== heads && undefined !== heads) {
        for (let index in heads) {
            let headTag = {}
            //titleLevel
            headTag.titleLevel = heads[index].titleLevel
            //title
            headTag.title = ""
            let count = heads[index].titleLevel - 1
            while (count > 0) {
                headTag.title += "\xa0\xa0\xa0\xa0"
                --count
            }
            headTag.title += heads[index].title
            //value
            headTag.value = heads[index]
                .title.replace(".", "")
                .replace(/[@$)，（）、]/g, "")
                .replace(/[( ]/g, "-")
                .toLowerCase()
            headTags.push(headTag)
        }
    }
    return headTags
}

export async function buildImgFormat(thisElement, callback) {
    if (!thisElement) {
        return
    }
    await sleep(50)
    let imgList = thisElement.getElementsByTagName("img");
    for (let i = 0; i < imgList.length; i++) {
        if (imgList[i].classList.length > 0) {
            continue
        }
        imgList[i].onclick = () => {
            callback(imgList[i])
        }
        imgList[i].style.cursor = 'zoom-in'
    }
}

