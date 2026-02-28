import MarkdownIt from 'markdown-it'
import MathJax3 from 'markdown-it-mathjax3'
import hljs from 'highlight.js'
import 'highlight.js/styles/a11y-light.css'
import { copyIcon } from '../centre.js'

const commentMd = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    // 关键：允许 $ 符号原样保留
    xhtmlOut: true,
    highlight: function (str, lang) {
        const code = (lang && hljs.getLanguage(lang)) ? hljs.highlight(str, { language: lang, ignoreIllegals: true }).value : md.utils.escapeHtml(str);
        const lines = code.trimEnd().split('\n').map(l => `<span class="line">${l}</span>`).join('\n');
        return `<div class="code-wrapper">
            <button class="copy-btn" data-code="${encodeURIComponent(str)}">${copyIcon}</button>
            <pre><span class="code-lang">${lang || 'txt'}</span><code class="hljs">${lines}</code></pre>
          </div>`;
    }
})
commentMd.use(MathJax3)

export function renderComment(content) {
    // 渲染前手动过滤掉可能的危险字符
    return commentMd.render(content);
}