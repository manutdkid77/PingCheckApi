import Header from "./Header";

export default function Dashboard() {
  return (
    <div className="container px-5 py-5 mx-auto">
      <Header
        title="Dashboard"
        description="Dashboard to check the current status of the internet."
      />
      <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4"></div>
    </div>
  );
}
