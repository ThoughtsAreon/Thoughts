import React from "react";
import Skeleton from "react-loading-skeleton";

const ArticleCardSkeleton = () => { 
  return (
    <div
      className="border border-gray-200 rounded-xl max-w-xl overflow-hidden h-96 flex flex-col justify-between cursor-pointer hover:border-gray-300"
    >
      <div className="">
        <div className="w-full h-48 bg-teal-300" />
        <p className="text-sm p-4"><Skeleton count={1} style={{ width: '112px'}} /></p>
        <h2 className="text-base font-medium text-gray-800 px-4">
            <Skeleton count={3} />
        </h2>
      </div>
      <div className="flex flex-row items-center p-4 gap-2">
        <div className="w-6 h-6 rounded-full bg-gray-100"/>
        <Skeleton count={1} style={{ height:'20px', width: '36px', borderRadius: '16px'}} />
        <Skeleton count={1} style={{ height:'20px', width: '138px', borderRadius: '16px'}} />
        <Skeleton count={1} style={{ height:'20px', width: '36px', borderRadius: '16px'}} />
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
