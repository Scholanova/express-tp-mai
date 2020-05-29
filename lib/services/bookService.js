const Joi = require('@hapi/joi')
const bookRepository = require('../repositories/bookRepository')

const bookSchema = Joi.object({
  title: Joi.string().required(),
  authorId: Joi.number().required()
})

const authorLibrarySchema = Joi.array().items(Joi.object({
  id: Joi.optional(),
  title: Joi.string(),
  authorId: Joi.number(),
  createdAt: Joi.optional(),
  updatedAt: Joi.optional()
})).unique('title').message("Duplicated book")

const bookService = {
  create: (bookData) => {
    return Promise.resolve(bookData)
      .then((bookData) => {
        const { value, error } = bookSchema.validate(bookData, { abortEarly: false })
        if (error) { throw error }
        return value
      })
      .then(validateRule)
      .then(bookRepository.create)
  }
}

function validateRule(bookData){
  return bookRepository.listForAuthor(bookData.authorId)
  .then ((books) => {
    let tmp = [...books.map(book => book.get()), bookData]
    const { _, error } = authorLibrarySchema.validate(tmp, {abortEarly: false})
    if(error){
      for(var i = 0; i < error.details.length; i++){
        error.details[i].path = ["title"]
      }
      throw error
    }
    return bookData
  })
}

module.exports = bookService
