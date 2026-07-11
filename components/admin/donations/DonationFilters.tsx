export default function DonationFilters() {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row">

        <input
          placeholder="Search donor..."
          className="flex-1 rounded-xl border px-4 py-3"
        />

        <select className="rounded-xl border px-4 py-3">
          <option>All Status</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>

        <select className="rounded-xl border px-4 py-3">
          <option>All Modes</option>
          <option>Cash</option>
          <option>UPI</option>
          <option>Bank</option>
          <option>Cheque</option>
        </select>

      </div>

    </section>
  );
}