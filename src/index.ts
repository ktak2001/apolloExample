import { ApolloServer} from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
  type Human {
    name: String
    age: Int
  }

  type Dog {
    name: String
    color: String
  }

  union Animals = Human | Dog

  type Query {
    people: [Human]
    search(contains: String): Boolean!
  }

  type Mutation {
    addPerson(name: String, age: Int): Human
  }
`;

const people = [
  {
    name: "A",
    age: 3
  },
  {
    name: "B",
    age: 15
  }
]

const dogs = [
  {
    name: "C",
    color: "Red"
  },
  {
    name: "D",
    color: "Red"
  }
]

const resolvers = {
  Query: {
    people: () => people,
    search: (name: String) => [...dogs, ...people].find((animal) => animal.name === name) !== undefined
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`url ready at ${url}`)