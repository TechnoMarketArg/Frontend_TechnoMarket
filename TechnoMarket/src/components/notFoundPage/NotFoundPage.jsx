
const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page not found :(</h1>
        <p className="text-lg text-gray-600 mb-6">The page you are looking for does not exist.</p>
        <a 
          href="/" 
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
         Go to the main page
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
