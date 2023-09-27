const mongoose = require('mongoose');

const QuestionsSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
      correctAnswer: {
        type: String,
        required: true,
      },

})

const Questions = mongoose.model("questions",QuestionsSchema);

module.exports = Questions;