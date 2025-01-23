import axios from "axios";
import React, { useState } from "react";

const AddCommentForm = ({articleName, setArticleInfo}) => {
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  const payload = {
    username,
    text: commentText
  }

  const addComments = async (e) => {
    e.preventDefault()
    const data = await axios.post(`/api/articles/${articleName}/add-comments`, payload)
    setArticleInfo(data.data)
    setUsername('')
    setCommentText('')
  }

  return (
    <form className="shadow rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Add a comment</h3>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Name:
      </label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
      ></input>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Comment:
      </label>
      <textarea
        rows={4}
        cols={50}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></textarea>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-black py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        onClick={addComments}
      >Submit</button>
    </form>
  );
};

export default AddCommentForm;
