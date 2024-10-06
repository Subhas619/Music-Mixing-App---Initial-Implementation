import React, { useState } from 'react'
import { ThumbsUp, MessageCircle } from 'lucide-react'

const UserInteractions: React.FC = () => {
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState<string[]>([])
  const [newComment, setNewComment] = useState('')

  const handleLike = () => {
    setLikes(likes + 1)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()])
      setNewComment('')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">User Interactions</h2>
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={handleLike}
          className="flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-200"
        >
          <ThumbsUp size={20} />
          <span>{likes}</span>
        </button>
        <div className="flex items-center space-x-2 text-gray-600">
          <MessageCircle size={20} />
          <span>{comments.length} comments</span>
        </div>
      </div>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded">
            {comment}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserInteractions