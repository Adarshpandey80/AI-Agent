export default function JobCard() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="text-xl font-bold">
        Frontend Engineer
      </h2>

      <p className="mt-2 text-gray-500">
        Google
      </p>

      <p className="mt-2">
        📍 Munich, Germany
      </p>

      <p className="mt-2">
        Platform : LinkedIn
      </p>

      <p className="mt-2 font-semibold text-green-600">
        Match : 95%
      </p>

      <div className="mt-5 flex gap-3">

        <button className="rounded bg-gray-200 px-4 py-2">
          View Job
        </button>

        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Apply
        </button>

      </div>

    </div>
  );
}