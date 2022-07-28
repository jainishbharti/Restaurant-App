import { Background } from "./Background";
import { Banner } from "./Banner";

export const HeroComponent = () => {
  return (
    <div data-testid="hero-comp">
      <Background>
        <Banner />
      </Background>
    </div>
  );
};
