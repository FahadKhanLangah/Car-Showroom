import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  keyword: { type: String, required: true },
  searchedAt: { type: Date, default: Date.now }
});

export const searchHistoryModel = mongoose.model('searchHistory', searchHistorySchema);

/* 
await searchHistoryModel.create({
  userId: req.user._id,
  keyword: "BMW"
});
*/