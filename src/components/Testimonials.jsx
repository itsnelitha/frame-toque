const testimonials = [
  {
    name: "ABCD",
    role: "ABC at ABC",
    image:
      "/images/testimonials/user.png",
    content:
      "Frame Toque transformed our website! It’s fast, sleek, and exactly what our brand needed..",
  },
  {
    name: "ABCD",
    role: "ABC at ABC",
    image:
      "/images/testimonials/user.png",
    content:
      "Their video editing and graphics made our campaign pop. Highly recommend!",
  },
  {
    name: "ABCD",
    role: "ABC at ABC",
    image:
      "/images/testimonials/user.png",
    content:
      "From start to finish, the team made everything simple and stress-free. Loved it!",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16">
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              What Clients are saying about us
            </h2>
          <p className="text-gray-400 text-base text-xl sm:text-lg max-w-2xl mx-auto">
           Our clients love what we do! See how we’ve helped businesses and creators grow with stunning designs, smooth websites, and eye-catching videos. Real feedback from real people - because your success is our goal.
          </p>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="space-y-6 sm:space-y-8">
              {testimonials.map((testimonial, key) => (
                <div
                  key={key}
                  className="bg-slate-900/50 p-4 sm:p-6 backdrop-blur-sm border border-slate-800 rounded-xl sm:rounded-2xl"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <div
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold 
                      bg-gradient-to-r from-green-400 to-green-400 bg-clip-text 
                      text-transparent"
                      >
                        "
                      </div>
                    </div>

                    <div className="flex-grow">
                      <p className="text-white text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                        {testimonial.content}
                      </p>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-white text-sm sm:text-base">
                            {testimonial.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
