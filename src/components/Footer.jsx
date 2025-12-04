import { Github, Send, Linkedin, Mail, Instagram } from "lucide-react";

const footerLinks = {
  Company: ["About", "Projects", "Contact"],
  Legal: ["Privacy", "Terms", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950/40 backdrop-blur-xl border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-12">
          {/* Logo + Social */}
          <div className="col-span-1 sm:col-span-4 lg:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-3 sm:mb-4">
              <img
                src="/images/name-logo.png"
                alt="Frame Toque Logo"
                className="w-45 h-10 sm:w-45 sm:h-10"
              />
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 max-w-xs mx-auto sm:mx-0 text-sm sm:text-base">
              Simple.Unique.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
              {[Send, Github, Linkedin, Instagram, Mail].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 sm:p-2.5 bg-white/5 backdrop-blur-md rounded-lg hover:bg-white/20 transition duration-300 flex items-center justify-center"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links + Info Column */}
          <div className="sm:col-span-4 lg:col-span-6">
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
                    {category}
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
                  Reg No:
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm max-w-xs">
                  yoooooooooooooooooo <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-[#44ed15] to-green-400 font-semibold">Do it Faster & Better With Us.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} Frame Toque. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
