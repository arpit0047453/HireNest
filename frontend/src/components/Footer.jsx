const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">

            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="flex flex-col md:flex-row justify-between items-center">

                    <div>
                        <h2 className="text-xl font-bold text-white">
                            HireNest
                        </h2>

                        <p className="text-sm mt-2">
                            MERN Internship Management Portal
                        </p>
                    </div>

                    <div className="mt-6 md:mt-0 flex gap-6">

                        <a
                            href="https://github.com/arpitomre18"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white"
                        >
                            GitHub
                        </a>

                        <a
                            href="https://www.linkedin.com/in/arpitomre18"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white"
                        >
                            LinkedIn
                        </a>

                    </div>

                </div>

                <hr className="my-6 border-gray-700" />

                <p className="text-center text-sm">

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