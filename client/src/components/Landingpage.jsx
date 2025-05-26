function Landingpage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Application</h1>
      <p className="text-lg mb-8">This is the landing page of our application.</p>
      <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Get Started
      </button>
    </div>
  );
}
export default Landingpage;