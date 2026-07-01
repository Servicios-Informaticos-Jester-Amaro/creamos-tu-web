function PortfolioCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-advance cada 4 segundos - SE REINICIA CADA VEZ QUE CAMBIA currentIndex
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  // Precargar todas las imágenes al montar
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    setIsLoaded(true);
  }, [images]);

  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-xl">
        <img
          key={currentIndex} // ← FORZA re-render cuando cambia el índice
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          width={640}
          height={360}
          loading="eager" // ← Cambiado de "lazy" a "eager" para carrusel
          className={`w-full aspect-video object-contain bg-[#050609] rounded-xl transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/80"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/80"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}