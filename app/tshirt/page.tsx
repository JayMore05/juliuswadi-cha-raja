import PublicTshirtRequestForm from "@/components/tshirt/PublicTshirtRequestForm";

export const metadata = {
  title: "T-Shirt Booking | Juliuswadi Cha Raja",
  description:
    "Submit your Juliuswadi Cha Raja Mandal T-Shirt booking request.",
};

export default function TshirtBookingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50">
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-3 text-5xl">
            🙏
          </div>

          <p className="mb-2 font-semibold uppercase tracking-widest text-orange-600">
            Juliuswadi Cha Raja
          </p>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
            Official Mandal T-Shirt
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Submit your T-Shirt request online. Our Mandal volunteer
            will verify your request and confirm your official booking.
          </p>

          <div className="mt-5 inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
            Online Request → Volunteer Verification → Official Booking
          </div>
        </div>

        <PublicTshirtRequestForm />
      </section>
    </main>
  );
}