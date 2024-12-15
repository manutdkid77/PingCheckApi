import Logo from "./Logo";

interface HeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row mb-5">
        <Logo pageUrl="/" />
        <h1 className="sm:w-2/5 text-white font-medium title-font text-2xl self-center">
          {title}
        </h1>
      </div>
      <div className="h-1 bg-gray-800 rounded overflow-hidden">
        <div className="w-24 h-full bg-indigo-500"></div>
      </div>
      <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-3">
        <p className="sm:w-3/5 leading-relaxed text-base">{description}</p>
      </div>
    </div>
  );
}
