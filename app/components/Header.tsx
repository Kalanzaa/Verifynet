interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="flex gap-4 items-center">
        <form className="flex bg-white rounded-lg shadow-sm overflow-hidden w-72">
          <input
            type="text"
            placeholder="Search verifications..."
            className="flex-1 px-4 py-2 border-none outline-none text-base"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 hover:bg-blue-800 transition">
            <i className="fas fa-search" />
          </button>
        </form>
        <div className="relative">
          <i className="fas fa-bell text-gray-500 text-xl cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold cursor-pointer">
          AJ
        </div>
      </div>
    </header>
  );
} 