import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">

        <div className="md:max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.svg" alt="logo" className="h-8 w-8" />
            <h2 className="text-2xl font-bold text-white">Travel Planner</h2>
          </div>
          <p className="text-sm text-gray-400">
            Building modern experiences through design and technology.
          </p>
        </div>

        <div className="flex flex-wrap gap-12 justify-end">
          <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Docs</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-white">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 px-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Travel Planner. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
