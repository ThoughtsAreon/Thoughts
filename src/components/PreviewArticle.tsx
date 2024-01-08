import { Button, Heading, Tag } from 'degen'
import React from 'react'
import { ArticleType, Author } from 'types/types'

// @ts-ignore
import edjsParser from 'editorjs-parser'
import { slice } from 'pages/utils/slice'

export type PreviewArticle = {
    author: Author
    article: ArticleType
}

function PreviewArticle({ author, article}: PreviewArticle) {
    const parser = new edjsParser();

  return (
    <div className="editor">
            <div className="mx-auto pt-6 px-4 sm:px-6 lg:px-8 max-h-screen scroll-auto flex flex-col">
                {/* nav with author photo and name and walletaddress on left and subscribe button on right. */}
                <div className="flex justify-between items-center px-8">
                    <div className="flex items-center space-x-4 cursor-pointer items-center">
                        <img className="w-10 h-10 rounded-full" src={author.img} alt="Author" />
                        <div>
                            <p className="text-gray-800 text-sm font-medium">
                                {author.name}
                            </p>
                            <Tag hover tone="accent" size="small">
                                {slice(author.walletAddress)}
                            </Tag>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        {
                            <button className="bg-teal-400 hover:bg-teal-600 text-white-100 font-bold py-2 px-6 rounded-lg cursor-pointer">
                                Subscribe
                            </button>
                        }
                    </div>
                </div>

                <div className="max-w-3xl min-w-[50vw] mx-auto py-6">
                    <div className="mt-8 flex flex-col items-center">
                        {
                            article.coverImg ? 
                                <img className="rounded-lg mb-6 w-[720px] h-[360px] bg-teal-50" src={article.coverImg} />
                                : <div className="rounded-lg mb-6 w-[720px] h-[360px] bg-teal-50"></div>
                        }
                    </div>

                    <Heading as="h1" level="1" align={"center"} color={"accent"}>{article.title}</Heading>

                    <div className="mt-8 flex items-center justify-between w-full space-x-4">
                        <div className="flex space-x-1">
                            <div className="cursor-pointer"
                            >
                                <Tag hover tone="accent" size="small">
                                    {slice(author.walletAddress)}
                                </Tag>
                            </div>
                            <Tag size="small">
                                10 mins read
                            </Tag>
                        </div>
                        <Tag size="small">
                            {article.createdAt}
                        </Tag>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: parser.parse(article.content) }} className="mt-8 font-Satoshi16px text-base leading-8 text-justify">
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PreviewArticle
