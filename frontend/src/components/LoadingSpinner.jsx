const LoadingSpinner = () => {
    return (
        <div className="min-h-[40vh] flex flex-col justify-center items-center px-4">

            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

            <p className="mt-5 text-gray-600 text-sm sm:text-base">
                Loading...
            </p>

        </div>
    );
};

export default LoadingSpinner;