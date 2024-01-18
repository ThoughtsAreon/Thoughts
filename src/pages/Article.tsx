import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Heading, Tag } from "degen";
import { ArticleType, Author } from "types/types";
import { useAuthor } from "hooks/useAuthor";
// @ts-ignore
import edjsParser from "editorjs-parser";
import SubscribeModel from "components/SubscribeModel";
import { AuthorLogo, TronLogo } from "images";

import { subscribeTxStatus } from "pages/utils/subscribeTxStatus";
import Loader from "components/Loader";
import { SkeletonLoader } from "components/Skeleton";
import { getIpfsURL } from "pages/utils/ipfs";
import Skeleton from "react-loading-skeleton";
import { useCurrentWallet } from "WalletProvider";
import {
  getAuthorDetailsFromUserName,
  getEdition,
  getPartialEdition,
  purchaseEdition,
} from "scripts";
import { toast } from "react-toastify";
import { slice } from "./utils/slice";

type PostProps = {
  post?: ArticleType;
  isPreview?: boolean;
  authorIdForPreview?: string;
  articleIdForPreview?: string;
};

const ArticlePage = ({
  post,
  isPreview = false,
  authorIdForPreview,
}: PostProps) => {
  const { authorId, articleId } = useParams() ?? {};
  const { connected, provider, address, wallet, connect } = useCurrentWallet();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<ArticleType>(undefined);
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [locked, setLocked] = useState(true);
  const [author, setAuthor] = useState<Author | null>(null);

  const isLoggedIn = connected && address

  useEffect(() => {
    (async () => {
      try {
        let author = await getAuthorDetailsFromUserName(authorId);
        setAuthor(author);
      } catch (e) {
        toast.error("Something went wrong");
        console.log(e);
      }
    })();
  }, [authorId]);

  const purchaseArticle = async () => {
    const loaderId = toast.loading('Transaction in progress..')
    try {
      if (!address || !article.price || !connected) {
        toast.error("Something went wrong");
        return;
      }
      const tx = await purchaseEdition(
        provider,
        wallet,
        article.price,
        articleId
      );

      if(tx.transactionHash) {
        toast.success('Edition purchased successfully')
       
      } else {
        toast.error("Transaction Failed");
      }

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      toast.dismiss(loaderId)
      window.location.reload()
    }
  };

  const handlePaidArticle = () => {
    if (showLogin) { connect(); window.location.reload() }
    else purchaseArticle();
  };

  // get articles by author address & article id
  const getMyArticleById = async (address: string) => {
    try {
      const edition = await getPartialEdition(address);
      return edition;
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    }
    return null;
  };

  // get if user has paid for article
  const getPaidArticle = async (provider: any, editionAddr: string) => {
    if (!provider) return null;
    const edition = await getEdition(provider, editionAddr);
    return edition;
  };

  useEffect(() => {
    if (isPreview) {
      setArticle(post);
    }
  }, [isPreview, post]);

  useEffect(() => {
    if (!author || !articleId) return;
    const getArticlesByAuthor = async (address: string) => {
      const articleById = await getMyArticleById(articleId);
      const articlePartial: ArticleType = {
        authorAddress: author.walletAddress,
        authorName: author.userName,
        authorDesc: "",
        authorImg: author.img,
        title: articleById.title,
        content: undefined,
        coverImg: getIpfsURL(articleById.imageURI),
        readTime: 10,
        createdAt: articleById.createdAt,
        id: articleById.address,
        likes: articleById.totalPurchased,
        price: articleById.price,
      };
      // setting article data excluding content
      setArticle(articlePartial);

      // if article is free, fetch content from ipfs
      if (parseInt(articleById.price) === 0) {
        setShowLogin(false);
        setLocked(false);
        const data: any = await fetch(getIpfsURL(articleById.contentURI)).then(
          (res) => res.json()
        );
        setArticle((prev) => ({ ...prev, content: data }));
      } else {
        //if article is paid, check if user is logged in
        if (!isLoggedIn) {
          // user not logged in
          setArticle((prev) => ({ ...prev, content: undefined }));
          setShowLogin(true);
          setLocked(true);
        } else {
          // if user is logged in, check if user has paid for article
          setShowLogin(false);
          const paidArticle = await getPaidArticle(wallet, articleId);
          if (paidArticle && paidArticle.contentURI !== "") {
            setLocked(false);
            let data = await fetch(getIpfsURL(paidArticle.contentURI)).then(
              (res) => res.json()
            );
            setArticle((prev) => ({ ...prev, content: data }));
          } else {
            setArticle((prev) => ({ ...prev, content: undefined }));
            setLocked(true);
          }
        }
      }
    };

    if (author && authorId && !isPreview) {
      if (author.name) document.title = `${author.name} - Thoughts`;
      getArticlesByAuthor(authorId);
    }
  }, [author, isPreview, articleId, address, connected]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!author || loading) return <Loader />;
  if (article === undefined) return <ArticlePageSkeleton author={author} />;

  return (
    <div className="editor">
      <div className="mx-auto pt-6 px-4 sm:px-6 lg:px-8 max-h-screen scroll-auto flex flex-col">
        <ArticlePageTopBar
          article={article}
          showLogin={showLogin}
          handlePaidArticle={handlePaidArticle}
          handleShow={handleShow}
          locked={locked}
        />
        <Article
          article={article}
          author={author}
          showContent={article.content !== undefined}
          locked={locked}
        />
      </div>
      {show && (
        <div>
          <div
            onClick={handleClose}
            className="absolute top-0 left-0 w-screen h-screen"
          ></div>
          <div className="absolute top-24 right-20">
            <SubscribeModel
              onSubscribe={handleClose}
              authorAddress={article.authorAddress}
              name={article.authorName}
            />
          </div>
        </div>
      )}
    </div>
  );
};

function getPrice({ price }: { price: string }) {
  if (parseInt(price) == 0) return <>{"Free to read"}</>;
  return (
    <div className="flex flex-row items-center">
      {"Pay"} <img src={TronLogo} className="h-5 w-5 mx-1" />{" "}
      {`${price}  to read`}
    </div>
  );
}

type ArticleProps = {
  article: ArticleType | undefined;
  author: Author | undefined;
  showContent: boolean;
  locked: boolean;
};

function Article({ article, author, showContent, locked }: ArticleProps) {
  const navigate = useNavigate();
  const parser = new edjsParser();

  return (
    <div className="max-w-3xl min-w-[50vw] mx-auto py-6">
      <div className="mt-8 flex flex-col items-center">
        {article.coverImg ? (
          <img
            className="rounded-lg mb-6 w-[720px] h-[360px] bg-teal-50 object-cover"
            src={article.coverImg}
          />
        ) : (
          <div className="rounded-lg mb-6 w-[720px] h-[360px] bg-teal-50"></div>
        )}
      </div>

      <Heading as="h1" level="1" align={"center"} color={"accent"}>
        {article.title}
      </Heading>

      <div className="mt-8 flex items-end justify-between w-full gap-[6px]">
        {author && (
        
          <div className="flex items-end gap-[6px]">
            <img
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => navigate(`/${author.userName}`)}
              src={author.img ? author.img : AuthorLogo}
              alt="Author"
            />
            <div
              className="cursor-pointer"
              onClick={() => navigate(`/${author.userName}`)}
            >
              <div className="text-gray-600 text-sm font-bold pl-1">
                {author.name}
              </div>
              <Tag hover tone="blue" size="small">
                {slice(author.walletAddress)}
              </Tag>
            </div>
            <Tag size="small">10 mins read</Tag>
            
          </div>
            
          
       
        )}
        <div className="flex flex-grow"></div>
     
        <Tag size="small">{article.createdAt}</Tag>
        { (article && article.likes > 0) && 
            <Tag hover tone="green" size="small">
              {article.likes}{" "}
              <span role="img" aria-label="Shopping Cart">
                🛒
              </span>{" "}
              claims
            </Tag>}
      </div>
      {showContent ? (
        <div
          dangerouslySetInnerHTML={{ __html: parser.parse(article.content) }}
          className="mt-8 font-Satoshi16px leading-8 text-justify"
        ></div>
      ) : (
        <SkeletonLoader showLock={locked} />
      )}
    </div>
  );
}

type ArticlePageTopBarProps = {
  article: ArticleType | undefined;
  handlePaidArticle: () => void;
  showLogin: boolean;
  handleShow: () => void;
  locked: boolean;
};

function ArticlePageTopBar({
  handlePaidArticle,
  article,
  showLogin,
  handleShow,
  locked,
}: ArticlePageTopBarProps) {
  const navigate = useNavigate();

  const getButtonStatus = () => {
    if (showLogin) return <>{"Login to read"}</>;
    if (locked) return getPrice({ price: article?.price });
    if (parseFloat(article?.price) > 0) return <>{"Collected Article"}</>;
    return <>{"Read for free"}</>;
  };

  const { address} = useCurrentWallet();
  return (
    <div className="flex justify-between items-center px-8">
      {/* {user && reader && <div onClick={() => navigate(`/dashboard`)} className="w-12 h-12 rounded-full cursor-pointer bg-green-800">
                <img className="w-full h-full" src={reader.img} />
            </div>} */}
      <div className="flex gap-6 ml-auto">
        {!(address && address === article.authorAddress) && (
          <>
            {article && (
              <Button
                variant="tertiary"
                size="small"
                onClick={handlePaidArticle}
              >
                {getButtonStatus()}
                {/* {showLogin
                                ? "Login to read"
                                : article?.price > 0
                                    ? (article?.content == undefined)
                                        ? getPrice({ price: article?.price }) 
                                        : "Collected Article"
                                    : "Read for free"} */}
              </Button>
            )}
            <button
              className="bg-teal-400 hover:bg-teal-600 text-white-100 font-bold py-2 px-6 rounded-lg cursor-pointer"
              onClick={handleShow}
            >
              Subscribe
            </button>
          </>
        )}
      </div>
    </div>
  );
}

type ArticlePageSkeletonProps = {
  author: Author | undefined;
};

function ArticlePageSkeleton({ author }: ArticlePageSkeletonProps) {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="flex justify-between items-center px-8 h-[60px]">
        <div className="flex gap-6 ml-auto">
          <Skeleton
            count={1}
            style={{ height: "40px", width: "124px", borderRadius: "12px" }}
          />
          <Skeleton
            count={1}
            style={{ height: "40px", width: "110px", borderRadius: "12px" }}
          />
        </div>
      </div>
      <div className="max-w-3xl min-w-[50vw] mx-auto py-6">
        <div className="mt-8 flex flex-col items-center">
          <div className="rounded-lg mb-6 w-[720px] h-[360px] bg-teal-50" />
          <Skeleton
            style={{ height: "64px", width: "600px", borderRadius: "16px" }}
          />
        </div>
        <div className="mt-8 flex items-end justify-between w-full space-x-4">
          {author && (
            <div className="flex items-end gap-2">
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => navigate(`/${author.address}`)}
                src={author.img}
                alt="Author"
              />
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/${author.address}`)}
              >
                <div className="text-gray-600 text-sm font-bold pl-1">
                  {author.name}
                </div>
                <Tag hover tone="green" size="small">
                  {author.address}
                </Tag>
              </div>
              <Tag size="small">10 mins read</Tag>
            </div>
          )}
          <Skeleton count={1} style={{ width: "68px", borderRadius: "16px" }} />
        </div>
        <SkeletonLoader showLock={false} />
      </div>
    </div>
  );
}

export default ArticlePage;
