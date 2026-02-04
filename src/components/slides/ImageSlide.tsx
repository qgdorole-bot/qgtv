import { Slide } from "./Slide";

interface ImageSlideProps {
  isActive: boolean;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  overlay?: boolean;
}

export const ImageSlide = ({ 
  isActive, 
  imageUrl,
  title,
  subtitle,
  overlay = true
}: ImageSlideProps) => {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      {(title || subtitle) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4 p-8">
            {title && (
              <h2 className={`text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight ${isActive ? 'fade-in-up' : ''}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-xl md:text-2xl lg:text-3xl font-light ${isActive ? 'fade-in-delayed' : ''}`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
