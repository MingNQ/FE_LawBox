import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const markdownComponents = {
  h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
  h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
  h4: ({ children }) => <h4 className="markdown-h4">{children}</h4>,
  p: ({ children }) => <p className="markdown-p">{children}</p>,
  ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
  ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
  li: ({ children }) => <li className="markdown-li">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="markdown-blockquote">{children}</blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="markdown-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="markdown-table-wrapper">
      <table className="markdown-table">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="markdown-thead">{children}</thead>,
  th: ({ children }) => <th className="markdown-th">{children}</th>,
  td: ({ children }) => <td className="markdown-td">{children}</td>,
  hr: () => <hr className="markdown-hr" />,
  strong: ({ children }) => (
    <strong className="markdown-strong">{children}</strong>
  ),
  em: ({ children }) => <em className="markdown-em">{children}</em>,
};

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={markdownComponents}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );
}
