import ArticleCard from "components/Card";
import { useAuthor } from "hooks/useAuthor";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleType, Author, ThoughtEdition } from "types/types";

import ArticleCardSkeleton from "components/CardSkeleton";
import Skeleton from "react-loading-skeleton";
import { getAuthorDetailsFromUserName, getAuthorPageAllEditions } from "scripts";
import { toast } from "react-toastify";
import { slice } from "./utils/slice";
import { Tag } from "degen";
import { AuthorLogo } from "images";

export type AuthorProps = {
  author: Author;
};

function AuthorPage() {
  const [articles, setArticles] = useState<ThoughtEdition[]>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [author, setAuthor] = useState<Author | null>(null);
  const { id: userName } = useParams();

  useEffect(() => {
    if (!userName) return;
    (async () => {
      try {
        let author = await getAuthorDetailsFromUserName(userName);
        setAuthor(author);
      } catch (e) {
        toast.error("Something went wrong");
        console.log(e);
      }
    })();
  }, [userName]);

  const navigate = useNavigate();

  useEffect(() => {
      if(!author) return
      (async () => {
        const editions = await getAuthorPageAllEditions(author.walletAddress)
        setArticles(editions)
      })()
  }, [author]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const authorAddress = searchValue;

      setSearchValue("");
      navigate(`/${authorAddress}`);
    }
  };

  return (
    <div className="flex flex-col scroll-auto">
      <div className="w-screen h-screen">
        <div className="h-[30vh] bg-teal-300"></div>
        <input
          className="rounded-full w-72 py-3 px-4 absolute top-4 right-4 outline-none"
          placeholder="Search Authors"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          onKeyDown={handleSearch}
        />
        <AuthorProfileSection author={author} />
        <div className="my-10 mx-auto w-5/6 py-8 px-4  bg-gray-100 rounded-lg ">
          <div className="flex justify-between items-center px-8">
            <div className="flex flex-col justify-center ">
              <div>Subscibe to {author?.name}</div>
              <div>Receive updates directly in your inbox</div>
            </div>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-transparent"
              />
              <button
                disabled={!author}
                className="bg-teal-500 hover:bg-red-600 text-white-100  px-4 py-2 rounded-r-lg focus:outline-none focus:ring-2 focus:border-transparent"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-20 w-5/6 mx-auto ">
          <AuthorArticleSection articles={articles} author={author} />
        </div>
      </div>
    </div>
  );
}

function AuthorArticleSection({
  author,
  articles,
}: {
  author: Author,
  articles: ThoughtEdition[] | undefined;
}) {
  return (
    <>
      {articles ? (
        articles.map((post) => <ArticleCard key={post.address} article={post} author={author} />)
      ) : (
        <>
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
        </>
      )}
    </>
  );
}

function AuthorProfileSection({ author }: { author: Author | undefined }) {
  return (
    <>
      {author ? (
        <div className="py-10 bg-gray-100">
          <img
            className="w-32 h-32 rounded-full mx-auto -mt-24 border-4 border-gray-100"
            src={author?.img ? author?.img: AuthorLogo}
            alt="Author"
          />
          <div className="text-center flex flex-col items-center">
            <h1 className="text-2xl font-black text-gray-800">
              {`${author.name}`}
            </h1>
            
            <div className="flex mt-1 ">
              <Tag hover tone="accent" size="small" >
                {`@${author.userName}`}
              </Tag>
              <Tag hover tone="accent" size="small">
                {slice(author.walletAddress)}
              </Tag>
            </div>
            <p className="text-gray-600 py-4 text-base w-3/5">
              {author?.description}
            </p>
          </div>
        </div>
      ) : (
        <AuthorProfileSectionSkeleton />
      )}
    </>
  );
}

function AuthorProfileSectionSkeleton() {
  return (
    <div className="py-10 bg-gray-100">
      <div className="w-32 h-32 rounded-full mx-auto -mt-24 border-4 border-gray-100 bg-gray-100 overflow-clip">
        <Skeleton
          count={1}
          style={{ width: "128px", height: "140px", marginTop: "-10px" }}
        />
      </div>
      <div className="text-center">
        <Skeleton
          count={1}
          style={{
            width: "120px",
            height: "24px",
            borderRadius: "16px",
            marginBottom: "4px",
          }}
        />
        <Skeleton
          count={2}
          style={{ height: "20px", width: "200px", borderRadius: "16px" }}
        />
      </div>
    </div>
  );
}

export default AuthorPage;
