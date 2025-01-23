import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articleContent from "./article-content";
import Articles from "../components/Articles";
import NotFound from "./NotFound";
import CommentsList from "../components/CommentsList";
import axios from 'axios'
import AddCommentForm from "../components/AddCommentForm";

const Article = () => {
  const { name } = useParams();
  const article = articleContent.find((article) => article.name === name);
  const otherArticles = articleContent.filter((a) => a.name !== name);
  const [articleInfo, setArticleInfo] = useState({comments: []})

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/articles/${name}`)
      setArticleInfo(result.data)
    }
    fetchData()
  }, [name])

  return (
    <>
      {!article ? (
        <NotFound></NotFound>
      ) : (
        <>
          <div>
            <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
              {article.title}
            </h1>
            {article.content && (
              <p className="mx-auto leading-relaxed text-base mb-4">
                {article.content}
              </p>
            )}
            <CommentsList comments={articleInfo.comments}></CommentsList>
            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}></AddCommentForm>
          </div>
          {otherArticles ? (
            <>
              <h1 className="sm:text-2xl text-xl font-bold my-4 text-gray-900">
                Other Articles
              </h1>
              <div className="flex flex-wrap -m-4">
                <Articles articles={otherArticles}></Articles>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Article;
