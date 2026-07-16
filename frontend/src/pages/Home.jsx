const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-6 text-center">

                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Welcome to HireNest
                    </h1>

                    <p className="text-xl md:text-2xl mb-8">
                        Discover internships, build your career,
                        and connect with top companies.
                    </p>

                    <div className="flex justify-center gap-4 flex-wrap">
                        <a
                            href="/companies"
                            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                        >
                            Browse Internships
                        </a>

                        <a
                            href="/register"
                            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
                        >
                            Get Started
                        </a>
                    </div>

                </div>
            </section>

            {/* Statistics */}
            <section className="max-w-6xl mx-auto py-16 px-6">

                <h2 className="text-3xl font-bold text-center mb-10">
                    HireNest at a Glance
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <h3 className="text-4xl font-bold text-blue-600">100+</h3>
                        <p className="mt-2 text-gray-600">Internships</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <h3 className="text-4xl font-bold text-green-600">50+</h3>
                        <p className="mt-2 text-gray-600">Companies</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <h3 className="text-4xl font-bold text-purple-600">500+</h3>
                        <p className="mt-2 text-gray-600">Students</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        <h3 className="text-4xl font-bold text-orange-500">1000+</h3>
                        <p className="mt-2 text-gray-600">Applications</p>
                    </div>

                </div>

            </section>

            {/* Features */}
            <section className="bg-white py-16">

                <div className="max-w-6xl mx-auto px-6">

                    <h2 className="text-3xl font-bold text-center mb-12">
                        Why Choose HireNest?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="shadow-lg rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-3">
                                🚀 Easy Applications
                            </h3>

                            <p className="text-gray-600">
                                Apply for internships with a single click and
                                track your application status.
                            </p>
                        </div>

                        <div className="shadow-lg rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-3">
                                🏢 Top Companies
                            </h3>

                            <p className="text-gray-600">
                                Explore internship opportunities from leading
                                startups and multinational companies.
                            </p>
                        </div>

                        <div className="shadow-lg rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-3">
                                📈 Career Growth
                            </h3>

                            <p className="text-gray-600">
                                Build your professional profile and kick-start
                                your career with the right opportunities.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-6 mt-10">
                <p>
                    © 2026 HireNest. All Rights Reserved.
                </p>
            </footer>

        </div>
    );
};

export default Home;