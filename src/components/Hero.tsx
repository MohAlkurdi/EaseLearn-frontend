export const Hero = () => {
  return (
    <section className="bg-white text-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-64 lg:flex lg:h-screen lg:items-center">
        <div className="absolute inset-0 my-auto w-96 h-32 rotate-12 bg-gradient-to-r from-blue-400 to-blue-700 blur-3xl opacity-50"></div>
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Enroll in Courses and Get Certified.
            <span className="sm:block"> Boost Your Skills. </span>
          </h1>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-gray-600 bg-gray-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/get-started"
            >
              Get Started
            </a>
            <a
              className="block w-full rounded border border-gray-600 px-12 py-3 text-sm font-medium text-gray-600 hover:bg-gray-600 focus:outline-none focus:ring active:bg-gray-500 sm:w-auto"
              href="/about"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
