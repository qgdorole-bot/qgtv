import qgMainImage from "@/assets/qg-role-main.png";

export const CornerLogo = () => {
  return (
    <div className="absolute top-6 left-6 z-30">
      <img 
        src={qgMainImage} 
        alt="QG do Rolê" 
        className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-80 hover:opacity-100 transition-opacity"
      />
    </div>
  );
};
