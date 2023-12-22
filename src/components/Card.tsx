import { Avatar, Tag } from "degen";
import { TronLogo } from "images";
import { getIpfsURL } from "pages/utils/ipfs";
import { slice } from "pages/utils/slice";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArticleType, Author, ThoughtEdition } from "types/types";

export type ArticleCardProps = {
  article: ThoughtEdition;
  author: Author;
};

const ArticleCard = ({ article, author }: ArticleCardProps) => {
  const navigate = useNavigate();

  const getPriceTag = (price: string) => {
    if (price === "0") {
      return "Free";
    } else {
      return (
        <div className="flex flex-row items-center">
          <span>{price}</span>
          <img src={TronLogo} className="h-3 w-3 mx-1" />
        </div>
      );
    }
  };

  return (
    <div
      onClick={() => navigate(`/${author.userName}/${article.address}`)}
      className="border border-gray-200 rounded-xl max-w-xl overflow-hidden h-96 flex flex-col justify-between cursor-pointer hover:border-gray-300"
    >
      <div className="">
        <div className="w-full h-48 bg-teal-300">
          {article.imageURI !== "" && (
            <img
              className="object-cover w-full h-48"
              src={getIpfsURL(article.imageURI)}
              alt="Edition Cover Img"
            />
          )}
        </div>

        <p className="text-sm p-4">{article.createdAt}</p>
        <h2 className="text-base font-medium text-gray-800 px-4">
          {article.title}
        </h2>
      </div>
      <div className="flex items-center p-4 gap-x-1">
        <Avatar label={author.name} size="6" src={author.img} />
        <p className="px-2 font-medium text-sm">{author.name}</p>
        <Tag hover tone="accent" size="small">
          {slice(author.walletAddress)}
        </Tag>
        <Tag hover tone="secondary" size="small">
          {getPriceTag(article.price)}
        </Tag>
        {article.totalPurchased > 0 && (
          <Tag hover tone="green" size="small">
            {article.totalPurchased}{" "}
            <span role="img" aria-label="Shopping Cart">
              🛒
            </span>{" "}
            claims
          </Tag>
        )}
        {/* <p className="text-sm text-gray-600 ml-2 bg-gray-100 py-1 px-2 rounded-full">
          {getPriceTag(article.price)}
        </p>
        <p
          onClick={() => navigate(`/${author.userName}`)}
          className="bg-red- text-xs max-w-min py-1 px-2 rounded-full hover:bg-gray-200"
        >
          {slice(author.walletAddress)}
        </p> */}
      </div>
    </div>
  );
};

export default ArticleCard;
