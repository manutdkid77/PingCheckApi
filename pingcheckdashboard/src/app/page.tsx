export default function Home() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font h-screen">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-col">
          <h1 className="sm:w-2/5 text-white font-medium title-font text-2xl mb-4">
            Ping Check Dashboard
          </h1>
          <div className="h-1 bg-gray-800 rounded overflow-hidden">
            <div className="w-24 h-full bg-indigo-500"></div>
          </div>
          <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-3">
            <p className="sm:w-3/5 leading-relaxed text-base">
              Dashboard to check the current status of the internet.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4"></div>
      </div>
    </section>
  );
}
