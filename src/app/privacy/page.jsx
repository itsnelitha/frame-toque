export const metadata = {
  title: "Privacy Policy | Frame Toque",
  description:
    "Read the privacy policy for Frame Toque, detailing how we collect and handle user data when submitting projects or using our services.",
};

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer.jsx";

export default function Privacy() {
  return (
    <>
      <main  className="min-h-screen bg-slate-950 text-white overflow-hidden">
        <Navbar />
        <br></br>
        <div className="min-h-screen bg-slate-950 text-white px-6 sm:px-10 lg:px-16 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center">Privacy Policy</h1>

          <section className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed">
                When you submit a project or contact us, we may collect personal information such as your name, email, phone number, and project details. Any other information you voluntarily provide may also be collected.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed">
                We use the information you provide to respond to your submissions, provide our services, improve user experience, and communicate updates related to your project or inquiry.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">3. Data Sharing</h2>
              <p className="text-gray-300 leading-relaxed">
                Frame Toque does not sell or share your personal information with third parties except for trusted partners who assist us in providing our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We take appropriate measures to safeguard your data, but please note that no online transmission can be guaranteed to be 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
              <p className="text-gray-300 leading-relaxed">
                You can request access to, update, or delete your personal information at any time. For such requests, please <Link href="/contact" className="text-green-400">contact us</Link>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">6. Changes to Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                Frame Toque may update this Privacy Policy occasionally. Continued use of our services indicates your acceptance of any changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">7. Contact</h2>
              <p className="text-gray-300 leading-relaxed">
                For questions about this Privacy Policy, please <Link href="/contact" className="text-green-600 hover:text-green-500 font-semibold">contact us</Link>.
              </p>
            </div>
          </section>
        </div>
        <Footer />
      </main >
    </>
  );
}
