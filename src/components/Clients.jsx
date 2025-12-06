import React from 'react'


const clients = [
  { name: "Client", logo: "/logos/ft/logo.png" },
  { name: "Client", logo: "/logos/ft/logo.png" },
  { name: "Client", logo: "/logos/ft/logo.png" },
  { name: "Client", logo: "/logos/ft/logo.png" },
  { name: "Client", logo: "/logos/ft/logo.png" },
  { name: "Client", logo: "/logos/ft/logo.png" },
];


function Clients() {
  return (
     <section className="py-5 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto">
           <h3 className="text-3xl sm:text-4xl font-semibold mb-10 text-center leading-tight">
              <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                Our&nbsp;
              </span>
              <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
                Clients
              </span>
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
              {clients.map((clients, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center p-4 bg-slate-800 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={clients.logo}
                    alt={clients.name}
                    className="h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default Clients