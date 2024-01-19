import { CardInterface } from "../interface/Card";
import Text from "./Text";
import UsdIcon from "../assets/image/currency-dollar.png";
import Image from "./Image";

const Card = ({ ...props }: CardInterface) => {
  const { artistName, trackName, primaryGenreName, artworkUrl100, onClick, collectionPrice } =
    props;
  return (
    <div className="p-2.5 rounded-lg bg-white shadow-xl mb-4" onClick={onClick}>
      <div className="flex">
        <div className="w-1/3">
          <Image className="rounded-lg" src={artworkUrl100} alt="ng-music-logo" />
        </div>

        <div className="w-2/3 px-4">
          <Text label={artistName} className="font-roboto text-xs font-medium text-[#334155]" />

          <Text label={trackName} className="font-roboto text-sm font-bold text-[#334155]" />

          <div className="flex justify-between mt-7">
            <Text
              label={primaryGenreName}
              className="font-roboto text-xs font-bold text-white py-1 px-2 bg-ng-green rounded-full"
            />

            <div className="flex items-center gap-2">
              <Image src={UsdIcon} className="w-auto h-6 self-center" alt="ng-music-logo" />

              <Text
                label={collectionPrice}
                className="font-roboto text-xs font-bold text-[#f5b014]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
