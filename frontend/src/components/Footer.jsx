const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">

                    {/* Logo */}

                    <div>

                        <h2 className="text-xl font-bold text-white">
                            HireNest
                        </h2>

                        <p className="text-sm mt-2">
                            MERN Internship Management Portal
                        </p>

                    </div>

                    {/* Social Links */}

                    <div className="flex flex-wrap justify-center gap-6">

                        <a
                            href="https://github.com/arpitomre18"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white transition"
                        >
                            GitHub
                        </a>

                        <a
                            href="https://www.linkedin.com/in/arpitomre18"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white transition"
                        >
                            LinkedIn
                        </a>

                    </div>

                </div>

                <hr className="my-6 border-gray-700" />

                <p className="text-center text-xs sm:text-sm leading-6">

                    © {new Date().getFullYear()} HireNest • Developed by

                    <span className="font-semibold text-white">
                        {" "}Arpit Omre
                    </span>

                </p>

            </div>

        </footer>
    );
};

export default Footer;