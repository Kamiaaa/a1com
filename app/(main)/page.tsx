import AboutA1 from "./components/AboutA1";
import AffordablePrice from "./components/AffordablePrice";
import Carousel from "./components/carousel/Carousel";
import ContactTeam from "./components/ContactTeam";
import IspFaq from "./components/ispfaq/IspFaq";
import KeyFeatures from "./components/keyfeatures/KeyFeatures";
import PromotionalBanner from "./components/PromotionalBanner";


export default function Home() {
  return (
    <>
      <Carousel />
      <KeyFeatures/>
      <AboutA1 />
      <PromotionalBanner />
      <AffordablePrice />
      <IspFaq />
      <ContactTeam />
    </>
  );
}
