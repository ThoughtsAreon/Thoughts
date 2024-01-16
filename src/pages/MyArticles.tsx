// a page for displaying all articles written by the current user
// this page is only accessible to logged in users
// each article is displayed on cards with the article's title and date

import React, { useEffect } from "react";
import { ThoughtEdition } from "types/types";
import { BodyLayout } from "components/BodyLayout";
import SideNav from "components/SideNav";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "hooks/useAuthor";
import RegisterProfile from "components/RegisterProfile";
import { LoaderAnimation } from "components/Loader";
import { useCurrentWallet } from "WalletProvider";
import { getAuthorEditions } from "scripts";

function MyArticles() {
  const [data, setData] = React.useState<ThoughtEdition[]>([]); // data is an array of articles

  const navigate = useNavigate();
  const { address, connected, provider, wallet } = useCurrentWallet();
  const { author, isAuthorLoading } = useAuthor();

  useEffect(() => {
    const getArticles = async () => {
      const result = await getAuthorEditions(wallet, address)
      console.log("Check Articles", result)
      setData(result)
    }

    if(address && connected && wallet) getArticles()
  }, [address, connected, wallet]);

  useEffect(() => {
    //if (!connected || !address || !network) { navigate("/"); }
  }, [connected, address]);

  if (!isAuthorLoading && author && !author.userName) {
    return <RegisterProfile />;
  }

  if (!author) {
    return (
      <BodyLayout>
        <SideNav selectedTab="Articles" />
        <div className="flex flex-col p-10 w-full items-center">
          <div className="flex flex-col w-full h-full">
            <LoaderAnimation />
          </div>
        </div>
      </BodyLayout>
    );
  }

  return (
    <BodyLayout>
      <SideNav selectedTab="Articles" />
      {/* add a button for create article on top right corner */}
      <div className="flex flex-col w-full">
        <div className="flex justify-end px-10 bg-white-100 py-4">
          <button
            className="bg-teal-400 hover:bg-teal-600 text-white-100 font-bold py-2 px-6 rounded-lg cursor-pointer"
            onClick={() => navigate("/write")}
          >
            Create Article
          </button>
        </div>
        <div className="flex flex-col p-10">
          <div className="flex flex-col items-center">
            {data?.length == 0 ? (
              <p className="text-center">
                You have no articles yet. Click on the button above to create
                one.
              </p>
            ) : (
              data?.map((article: ThoughtEdition) => (
                <>
                  <div
                    key={article.address}
                    onClick={() => navigate(`/${author.userName}/${article.address}`)}
                    className="flex justify-between w-[840px] bg-white-100 p-8 my-2 rounded-2xl cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <h2 className="text-lg font-black">{article.title}</h2>
                      <p className="text-sm text-gray-400">
                        {article.createdAt}
                      </p>
                    </div>
                    <div>
                      <span className="material-icons self-center hover:bg-gray-100 p-2 cursor-pointer rounded-full">
                        edit
                      </span>
                      <span className="material-icons self-center hover:bg-gray-100 p-2 cursor-pointer rounded-full">
                        delete
                      </span>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </BodyLayout>
  );
}

export default MyArticles;