export default function DashboardStats() {
  return (
    <section className="grid grid-cols-4 gap-5">

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-gray-500">Jobs Found</h2>
        <p className="mt-2 text-3xl font-bold">125</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-gray-500">New Today</h2>
        <p className="mt-2 text-3xl font-bold">18</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-gray-500">Applied</h2>
        <p className="mt-2 text-3xl font-bold">12</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-gray-500">Interviews</h2>
        <p className="mt-2 text-3xl font-bold">2</p>
      </div>

    </section>
  );
}