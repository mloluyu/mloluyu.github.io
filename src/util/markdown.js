import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  // 关键：允许 $ 符号原样保留
  xhtmlOut: true
})

// 不要使用 texmath！直接输出原始内容
export function renderMarkdown(source) {
  return md.render(source)
}