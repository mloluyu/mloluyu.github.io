import MarkdownIt from 'markdown-it'
import MathJax3 from 'markdown-it-mathjax3'
import hljs from 'highlight.js'
import 'highlight.js/styles/a11y-light.css'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'
import { copyIcon } from '../centre.js'

let lastGeneratedToc = '' // 用于存储最新生成的 TOC HTML

const md = new MarkdownIt({
  html: true,
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
md.use(anchor, { 
  slugify: (s) => String(s).trim().toLowerCase().replace(/\s+/g, '-')
})
md.use(toc, {
  containerClass: 'table-of-contents',
  // 关键：当 TOC 生成时，将其回调给变量
  callback: (html) => { lastGeneratedToc = html }
})
md.use(MathJax3)

// 不要使用 texmath！直接输出原始内容
export function renderMarkdown(source) {
  return md.render(source) // 直接渲染，不进行任何替换;
}

export function getLatestToc() {
    return lastGeneratedToc;
}