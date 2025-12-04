export default function AboutUs() {
  const teamMembers = [
    {
      name: "Kavinu Pasandul",
      role: "Video Editor",
      image: "/projects/smurf.webp",
    },
        {
      name: "Tharul Bandara",
      role: "Graphic Designer",
      image: "/projects/smurf.webp",
    },
    {
      name: "Nelitha Priyawansha",
      role: "Developer",
      image: "/projects/smurf.webp",
    },
    {
      name: "Sadaka",
      role: "Developer",
      image: "/projects/smurf.webp",
    }
  ];

  return (
    <section className="min-h-screen bg-slate-950 text-white py-16 px-6 sm:px-10 lg:px-16">
       {/* Pulse */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#44ed15]-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* About Section */}
      <div className="max-w-6xl mx-auto mb-16 text-center lg:text-left">
        <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          About Us
        </h2>
        <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto lg:mx-0">
          blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl sm:text-4xl font-semibold mb-10 text-center">
          Meet Our Team
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold mb-2">{member.name}</h4>
                <p className="text-gray-400">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
