import { IoLogoWhatsapp } from "react-icons/io";

const whatsappNumber = "5545988085765";
const whatsappUrl = `https:wa.me/${whatsappNumber}`;

const WhatsApp = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 p-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold shadow focus:outline-none focus:ring-2 focus:ring-green-400 hover:scale-90 ease-in-out duration-300 transition-all "
        aria-label="Conversar no WhatsApp"
      >
        <IoLogoWhatsapp size={32} />
      </a>
    </div>
  );
};

export default WhatsApp;
