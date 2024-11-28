import {marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from "highlight.js";

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
// marked.use(gfmHeadingId({}));
marked.use({
    mangle: false,
    headerIds: false
});

// 代码样式选择 https://highlightjs.org/static/demo/
const styleEnums = [
    'androidstudio', 'codepen-embed', 'felipec', 'hybrid', 'kimbie-dark', 'lioshi', 'nord',
    'panda-syntax-dark', 'paraiso-dark', 'srcery', 'stackoverflow-dark', 'tomorrow-night-bright', 'vs2015'
]

const styleEnumsLight = [
    'panda-syntax-light',
    'stackoverflow-light',
    'tokyo-night-light',
    'codepen-embed',
    'hybrid',
]

function importStyle() {
    const random = Math.floor(Math.random() * 10000)
    const randomStyle = styleEnums[random % styleEnums.length]
    import('../../node_modules/highlight.js/styles/' + randomStyle + '.css')
}

function importStyleLight() {
    const random = Math.floor(Math.random() * 10000)
    const randomStyle = styleEnumsLight[random % styleEnumsLight.length]
    import('../../node_modules/highlight.js/styles/' + randomStyle + '.css')
}

export {
    marked, importStyle, importStyleLight
}