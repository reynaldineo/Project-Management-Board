import "./tag.css";

export default function Tag({ title }: { title: string }) {
  return <div className="tag">{title}</div>;
}
