import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Share, Bookmark, ThumbsUp } from "lucide-react";

const CopywritingRecord = ({ copywritingResults }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "전체" },
    { id: "quotes", name: "명언" },
    { id: "poetry", name: "시구절" },
    { id: "copy", name: "카피" },
  ];

  const renderCopyCard = (item, index) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-lg hover:shadow-2xl transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm text-purple-600 dark:text-purple-400">
          {index + 1}위 • {item.score ? `${item.score}점` : "점수 평가 중"}
        </span>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-full transition-colors">
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-full transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-full transition-colors">
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-lg font-semibold mb-2 p-3 bg-purple-50 dark:bg-purple-900/30 rounded border-l-4 border-purple-500">
        {item.content}
      </div>

      <div className="flex gap-2 mt-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(item.score / 20)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? "bg-purple-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-800"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {copywritingResults.map((item, index) => renderCopyCard(item, index))}
      </div>
    </div>
  );
};

export default CopywritingRecord;
