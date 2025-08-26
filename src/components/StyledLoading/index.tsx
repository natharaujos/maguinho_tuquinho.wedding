const StyledLoading = () => (
  <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
    <div className="relative flex flex-col items-center">
      <div className="w-16 h-16 relative">
        {/* Outer circle - static */}
        <div className="absolute inset-0 rounded-full border-4 border-pink-300/30"></div>
        {/* Inner circle - spinning */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-600 animate-spin duration-700"></div>
      </div>
      <span className="mt-4 text-pink-600 font-medium">Carregando...</span>
    </div>
  </div>
);

export default StyledLoading;
