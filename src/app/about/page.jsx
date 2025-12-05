export const metadata = {
  title: "About Us | Frame Toque",
  description:
    "Learn more about Frame Toque, our mission to empower brands with stunning web development, graphic designing, and video editing services.",
};

import About from "@/components/About.jsx";

export default function AboutOut() {

  return (
    <>
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <About />
    </div>
    </>
  );
}