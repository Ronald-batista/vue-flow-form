let entry = process.argv.pop()
if (entry && entry.indexOf('.js') === -1) {
  entry = null
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-flow-form/'
    : '/',
  pages: {
    index: {
      // Replace with your .js entry file path. 
      // To see the quiz example, use 'examples/quiz/main.js'
      // To see the support page example, use 'examples/support-page/main.js'
      entry: entry || 'src/views/questionnaire/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  }
}