import classNames from "classnames";
import React from "react";
import Skeleton from "react-loading-skeleton";

export function SkeletonLoader({showLock} : {showLock: boolean}) {
    return (
        <div className="flex relative items-center">
            <div className={classNames("w-full flex flex-col gap-5 py-8 rounded-xl",{
                "blur-sm": showLock
            })}>
                <Skeleton count={2} />
                <Skeleton count={4} />
                <Skeleton count={3} />
                <Skeleton count={4} />
                <Skeleton count={2} />
            </div>
            {showLock && <div className="flex flex-col absolute w-full items-center z-50 py-4 rounded-2xl">
                <span className="material-icons cursor-pointer rounded-full">
                    lock
                </span>
                <p className="text-center">Login & Pay To Read This Article</p>
            </div>}
        </div>
    );
};
