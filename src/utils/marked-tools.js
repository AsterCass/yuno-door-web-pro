import {marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from "highlight.js";
import {gfmHeadingId} from "marked-gfm-heading-id";

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
const styleEnums = [
    'androidstudio',
    // 'codepen-embed',
    'felipec',
    'hybrid',
    // 'kimbie-dark',
    'lioshi',
    // 'nord',
    'panda-syntax-dark',
    // 'paraiso-dark',
    // 'srcery',
    // 'stackoverflow-dark',
    'tomorrow-night-bright',
    'vs2015',
]

const styleEnumsLight = [
    'panda-syntax-light',
    // 'stackoverflow-light',
    'tokyo-night-light',
    // 'codepen-embed',
    // 'hybrid',
]

export function importStyle() {
    const random = Math.floor(Math.random() * 10000)
    const randomStyle = styleEnums[random % styleEnums.length]

    console.log(randomStyle)
    import('../../node_modules/highlight.js/styles/' + randomStyle + '.css')
}

export function importStyleLight() {
    const random = Math.floor(Math.random() * 10000)
    const randomStyle = styleEnumsLight[random % styleEnumsLight.length]
    import('../../node_modules/highlight.js/styles/' + randomStyle + '.css')
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

