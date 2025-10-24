import heroImg from '../../assets/stitches-hero.jpg';
import { Link } from 'react-router';

const Hero = () => {
  return (
    <section className="relative">
      <img src={heroImg} alt="Stitches" className="w-full h-[400px] md:h-[600px] object-cover" />
      <div className="absolute inset-0  bg-black/10 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase mb-4">
            Everyday <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our every day ready outfits with fast worldwide shipping
          </p>
          <Link
            to="/collection/all"
            className="bg-white text-gray-950 px-6  py-2 text-lg rounded-sm hover:bg-gray-100"
          >
            Shop now!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
