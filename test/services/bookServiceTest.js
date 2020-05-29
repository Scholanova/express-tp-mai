const { expect, sinon, factory } = require('../testHelper')

const bookService = require('../../lib/services/bookService')
const bookRepository = require('../../lib/repositories/bookRepository')
const Joi = require('@hapi/joi')
const Book = require('../../lib/models').Book

describe('bookService', () => {
  
  describe('create', () => {
    
    let bookData
    let bookCreationPromise
    
    beforeEach(() => {
      sinon.stub(bookRepository, 'create')
    })
    
    context('when the book data is valid', () => {
      
      let book
      
      beforeEach(() => {
        // given
        bookData = factory.createBookData()
        book = new Book(bookData)
        bookRepository.create.resolves(book)
        
        // when
        bookCreationPromise = bookService.create(bookData)
      })
      
      it('should call the book Repository with the creation data', async () => {
        // then
        await bookCreationPromise.catch(() => {})
        expect(bookRepository.create).to.have.been.calledWith(bookData)
      })
      it('should resolve with the created book from repository', () => {
        // then
        return expect(bookCreationPromise).to.eventually.equal(book)
      })
    })
    
    context('when the book title is missing', () => {
      
      beforeEach(() => {
        // given
        bookData = factory.createBookData()
        bookData.title = undefined
        
        // when
        bookCreationPromise = bookService.create(bookData)
      })
      
      it('should not call the book Repository', async () => {
        // then
        await bookCreationPromise.catch(() => {})
        expect(bookRepository.create).to.not.have.been.called
      })
      it('should reject with a ValidationError error about missing title', () => {
        // then
        const expectedErrorDetails = [{
          message: '"title" is required',
          path: ['title'],
          type: 'any.required',
          context: { label: 'title', key: 'title' }
        }]
        
        return expect(bookCreationPromise)
        .to.eventually.be.rejectedWith(Joi.ValidationError)
        .with.deep.property('details', expectedErrorDetails)
      })
    })
    
    context('when the book title already exists for this author', () => {
      
      let authorId = 123
      let bookData2
      
      beforeEach(async () => {
        
        sinon.stub(bookRepository, 'listForAuthor')
        
        // given
        // author = factory.createAuthor()
        
        // await author.save()
        
        // authorId = author.id
        // console.log(authorId )
        
        book1 = factory.createBook({title: "toto a la plage", authorId})
        // await book1.save()
        
        bookData2 = factory.createBookData({title: "toto a la plage", authorId})
        
        bookRepository.listForAuthor.resolves([book1])
        
        // when
        bookCreationPromise = bookService.create(bookData2)
      })
      
      it('should call the book Repository', async () => {
        // then
        await bookCreationPromise.catch(() => {})
        expect(bookRepository.listForAuthor).to.have.been.calledWith(authorId)
      })
      it('should reject with a ValidationError error about duplicate title', () => {
        // then
        const expectedErrorDetails = [{
          "context": {
            "dupePos": 0,
            "dupeValue": {
              "authorId": 123,
              "id": 756,
              "title": "toto a la plage"
            },
            "key": 1,
            "label": "[1]",
            "path": "title",
            "pos": 1,
            "value": {
              "authorId": 123,
              "title": "toto a la plage"
            }
          },
          message: 'Duplicated book',
          path: ['title'],
          type: "array.unique"
        }]
        
        return expect(bookCreationPromise)
        .to.eventually.be.rejectedWith(Joi.ValidationError)
        .with.deep.property('details', expectedErrorDetails)
      })
    })
    
    
    context('when the book title is empty', () => {
      
      beforeEach(() => {
        // given
        bookData = factory.createBookData({ title: '' })
        
        // when
        bookCreationPromise = bookService.create(bookData)
      })
      
      it('should not call the book Repository', async () => {
        // then
        await bookCreationPromise.catch(() => {})
        expect(bookRepository.create).to.not.have.been.called
      })
      it('should reject with a ValidationError error about empty title', () => {
        // then
        const expectedErrorDetails = [{
          message: '"title" is not allowed to be empty',
          path: ['title'],
          type: 'string.empty',
          context: { label: 'title', key: 'title', value: '' }
        }]
        
        return expect(bookCreationPromise)
        .to.eventually.be.rejectedWith(Joi.ValidationError)
        .with.deep.property('details', expectedErrorDetails)
      })
    })
    
    context('when the author id is missing', () => {
      
      beforeEach(() => {
        // given
        bookData = factory.createBookData()
        bookData.authorId = undefined
        
        // when
        bookCreationPromise = bookService.create(bookData)
      })
      
      it('should not call the book Repository', async () => {
        // then
        await bookCreationPromise.catch(() => {})
        expect(bookRepository.create).to.not.have.been.called
      })
      it('should reject with a ValidationError error about missing authorId', () => {
        // then
        const expectedErrorDetails = [{
          message: '"authorId" is required',
          path: ['authorId'],
          type: 'any.required',
          context: { label: 'authorId', key: 'authorId' }
        }]
        
        return expect(bookCreationPromise)
        .to.eventually.be.rejectedWith(Joi.ValidationError)
        .with.deep.property('details', expectedErrorDetails)
      })
    })
    
    context('when author have 4 books', () => {
      
      let authorId
      let existingBookData
      
      beforeEach(() => {
        // given
        authorId = 543
        bookData = factory.createBookData({ authorId })
        existingBookData = Array.from({length: 4}).map((_,i) => (
          { id:i, authorId , title: `title ${i}` }
        ))

        book = new Book(bookData)
        bookRepository.create.resolves(book)
        
        sinon.stub(bookRepository, 'listForAuthor')
        bookRepository.listForAuthor.resolves(existingBookData.map( e => factory.createBook(e)))
                
        // when
        bookCreationPromise = bookService.create(bookData)
      })
        
      it('should call the book Repository ', async () => {
        // then
        await bookCreationPromise.catch(() => {})
        expect(bookRepository.create).to.have.been.calledWith(bookData)
      })
      it('should resolve with the created book from reprository', () => {
        return expect(bookCreationPromise).to.eventually.equal(book)
      })
    })
        
    context('when author have already 5 books', () => {
      
      let authorId
      let existingBookData
      
      beforeEach(() => {
        // given
        authorId = 543
        bookData = factory.createBookData({ authorId })
        existingBookData = Array.from({length: 5}).map( (_,i) => (
          { id: i , authorId: authorId , title: `title ${i}` }
        ))
        
        book = new Book(bookData)
        bookRepository.create.resolves(book)
        
        sinon.stub(bookRepository, 'listForAuthor')
        bookRepository.listForAuthor.resolves(existingBookData.map(e => factory.createBook(e)))        
        
        // when
        bookCreationPromise = bookService.create(bookData)
      })
      
      it('should not call the book Repository ', async () => {
        // then
        await bookCreationPromise.catch(() => {})
        expect(bookRepository.create).to.not.have.been.calledWith(bookData)
      })
      
      it('should reject with a ValidationError error already five books for the author', () => {
        // then
        const expectedErrorDetails = [{
          message: 'Author cannot have more than 5 books',
          path: ["title"],
          type: 'array.max',
          context: { label: 'value', limit: 5, value: [...existingBookData, bookData] }
        }]
        return expect(bookCreationPromise)
        .to.eventually.be.rejectedWith(Joi.ValidationError)
        .with.deep.property('details', expectedErrorDetails)
      })
    })
  })
})
    