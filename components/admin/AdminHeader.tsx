export default function AdminHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome to Juliuswadi Cha Raja CMS
        </p>
      </div>

      <button className="rounded-lg bg-orange-600 px-5 py-2 text-white hover:bg-orange-700">
        Logout
      </button>
    </header>
  );
}