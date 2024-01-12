import { Author, ThoughtEdition } from "types/types";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "../hooks/useAuthor";
import React, { ReactElement } from "react";
import { TronLogo } from "images";
import { slice } from "pages/utils/slice";
import { Tag } from "degen";

function ClaimedArticle({
    article,
    author,
}: {
    article: ThoughtEdition;
    author: Author;
}): ReactElement {
    const navigate = useNavigate();
    console.log(author, article);
    return (
        <div
            key={article.address}
            onClick={() => navigate(`/${author.userName}/${article.address}`)}
            className="flex justify-start items-center w-[840px] bg-white-100 p-8 rounded-xl cursor-pointer"
        >
            <div
                className="rounded-full w-12 h-12 bg-green-400 mr-3"
                onClick={() => navigate(`/${author.userName}`)}
            >
                <img src={author?.img} className="h-full w-full rounded-full" />
            </div>
            <div className="flex flex-col">
                <h2 className="text-lg">{article.title}</h2>
                <div className="flex flex-row w-full gap-x-3 mt-1">
                    <Tag hover tone="accent" size="medium">
                        {`Author: @${author.userName}`}
                    </Tag>
                    <Tag hover tone="secondary" size="medium">
                        {`Claim date: ${article.createdAt}`}
                    </Tag>
                    <Tag hover tone="green" size="medium">
                        {article.totalPurchased}{" "}
                        <span role="img" aria-label="Shopping Cart">
                            🛒
                        </span>{" "}
                        claims
                    </Tag>
                </div>
            </div>
            <div className="flex flex-grow" />
            <div className="text-teal-600 text-lg px-2 py-1 items-center rounded-full font-Satoshi24px flex flex-row">
                <img src={TronLogo} className="h-5 w-5 mx-1" />
                <p>{article.price} TAREA</p>
            </div>
        </div>
    );
}

export default ClaimedArticle;
