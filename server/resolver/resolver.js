const resolvers = {
  //QUERY
  Query: {
    books: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAllBooks();
    },
    book: async (parent, { id }, { mongoDataMethods }) =>
      { return await mongoDataMethods.getBookById(id)},
    authors: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.getAllAuthors();
    },
    author: async (parent, { id }, { mongoDataMethods }) => {
      return await mongoDataMethods.getAuthorById(id);
    },
  },

  Book: {
    author: async ({ authorId }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(authorId),
  },
  Author: {
    books: async ({ id }, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks({ authorId: id }),
  },
  // MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.createAuthor(args);
    },
    createBook: async (parent, args, { mongoDataMethods }) => {
      return await mongoDataMethods.createBook(args);
    },
  },
};

module.exports = resolvers;
