import { Background } from "./Banner/Background";
import { Banner } from "./Banner/Banner";

export const HeroComponent = () => {
  return (
    <div>
      <Background>
        <Banner />
      </Background>
    </div>
  );
};
