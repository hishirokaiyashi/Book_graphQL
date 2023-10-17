import { gql } from "@apollo/client";

const addSingleBook = gql`
  mutation addSingBookMutation($name: String, $genre: String, $authorId: ID!) {
    createBook(name:$name,genre:$genre,authorId:$authorId) {
      id
      name
    }
  }
`;

const addSingleAuthor = gql`
  mutation addSingleAuthorMutation($name: String, $age:Int){
    createAuthor(name:$name,age:$age){
        id
        name
        age
    }
  }
`
export { addSingleBook, addSingleAuthor};
