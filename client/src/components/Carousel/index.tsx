import Carousel from "react-bootstrap/Carousel";
import { useGetAllProductsQuery } from "../../redux/APIs/productsAPI";

import "./carousel.scss";

type CarouselDataType = {
  name: string;
  description: string;
  img: string;
};

const CarouselComponent = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const carouselItems = data?.slice(0, 3) as CarouselDataType[];

  return (
    <div className="carousel__page">
      <Carousel className="carousel" variant="dark">
        <Carousel.Item>
          <img
            className="carousel__img"
            src={carouselItems[0].img}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{carouselItems[0].name}</h3>
            <p>{carouselItems[0].description}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel__img"
            src={carouselItems[1].img}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>{carouselItems[1].name}</h3>
            <p>{carouselItems[1].description}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel__img"
            src={carouselItems[2].img}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>{carouselItems[2].name}</h3>
            <p>{carouselItems[2].description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
