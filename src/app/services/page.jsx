export const metadata = {
  title: "Our Services | Frame Toque",
  description:
    "Explore our range of services including web development, graphic designing, and video editing tailored to make your brand shine.",
};

import Services from "@/components/Services.jsx";

export default function Home() {


  return (
    <>
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Services />
    </div>
    </>
  );
}
