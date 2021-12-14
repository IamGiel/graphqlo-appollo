
const fs = require('fs');
const path = require('path');

const {
  ApolloServer
} = require('apollo-server');

// 1
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]
let episodes = [{
  id: '001',
  name: 'Episode 1',
},{
  id: '002',
  name: 'Episode 2',
}]

let players = [{
  id: 123123,
  name: 'Gel de Asis',
  bio: 'I am a developer'
}]

let food = [{
  id: 233,
  name: 'Shrimp Scampi',
  appearsIn: episodes
}]

// 1
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    // 2 
    postLink: (parent, args) => {
      console.log("this parent: ", parent, " this is args: ", args)
    let idCount = links.length
      
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link) 
      console.log("this is pushed link: ",link)  
      return link
    },
    updateLink: (parent, args) => {
      console.log("update:::: this parent: ", parent, " this is args: ", args)
      
      const editedLink = {
        id: args.id,
        description: args.description,
        url: args.url,
      }

      const index = links.findIndex(x => x.id === args.id)
      links[index] = editedLink;
      return editedLink
    },
    deleteLink: (parent, args) => {
      console.log("update:::: this parent: ", parent, " this is args: ", args)
      const index = links.findIndex(x => x.id === args.id)

      console.log(links[index])
      links.splice(index,1) 
      console.log("deleted index: ", links)
      return links[index];
    }
  },
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers
})

server
  .listen()
  .then(({
      url
    }) =>
    console.log(`server is listening on ${url}`)
  );