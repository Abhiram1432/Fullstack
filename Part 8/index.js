require('dotenv').config()
const { ApolloServer, UserInputError, gql, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const uuid = require('uuid/v1')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

console.log('connecting to ',process.env.MONGODB_URI)
mongoose.set( 'useFindAndModify', false )
mongoose.connect( process.env.MONGODB_URI, { useNewUrlParser: true } )
	.then( () => {
		console.log('connected to MONGODB')
	})
	.catch( error => {
		console.log('error in connecting to DB:', error.message)
	})

const typeDefs = gql`
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}
	type Token {
		value: String!
	}
	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}
	type Author {
		name: String!
		born: Int
		bookCount: Int
		id: ID!
	}
	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: [String]): [Book!]
		allAuthors: [Author!]!
		me: User
	}
	type Mutation {
		addBook(
		title: String!
		published: Int!
		author: String!
		genres: [String]
		born: Int
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(
			username: String!
			favoriteGenre: String!
		): User
		login(
			username: String!
			password: String!
		): Token
	}
	type Subscription {
		bookAdded: Book!
	}
`

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			let books = await Book.find({})

			if( args.genre ) books = books.filter( b => b.genres.includes(args.genre) )
			if( args.author ) {
				const author = await Author.findOne({ name: args.author })
				books = books.filter( b => b.author.equals(author._id) )
			}

			return books.map( async book => {
				const author = await Author.findById( book.author )

				return {
					title: book.title,
					genres: book.genres,
					published: book.published,
					name: author.name,
					born: author.born
				}
			})
		},
		allAuthors: async () => {
			const authors = await Author.find({})
			return authors.map( async author => {
				return {
					name: author.name,
					born: author.born,
					id: author._id,
					bookCount: await Book.find({ author: author._id }).countDocuments()
				}
			})
		},
		me: ( root, args, context ) => {
			return context.currentUser
		}
	},
	Book: {
		author: (root) => {
			const mBorn = root.born === undefined ? null : root.born
			
			return {
				name: root.name,
				born: mBorn
			}
		}
	},
	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			if( !currentUser ) {
				throw new AuthenticationError('not authorized')
			}

			let author = await Author.findOne({ name: args.author })
			if( !author ) {
				author = await new Author({ name: args.author })
				await author.save()
			}

			const book = new Book({ ...args, author })
			try {
				await book.save()
			}
			catch ( error ) {
				throw new UserInputError( error.message, {
					invalidArgs: args
				})
			}
			pubsub.publish('BOOK_ADDED', { bookAdded: book })

			return {
				title: book.title,
				published: book.published,
				genres: book.genres,
				name: author.name,
				born: author.born
			}
		},
		editAuthor: async (root, args, { currentUser }) => {
			if( !currentUser ) throw new AuthenticationError('not authorized')
			
			const author = await Author.findOne({ name: args.name })
			if( !author ) return null
			author.born = args.setBornTo
			try {
				await author.save()
			}
			catch( error ) {
				throw new UserInputError( error.message, {
					invalidArgs: args
				})
			}
			return author
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if( !user || args.password !== 'secret' ) {
				throw new UserInputError( 'wrong credentials' )
			}

			const userForToken = {
				username: args.username,
				id: user._id
			}

			return { value: jwt.sign( userForToken, process.env.JWT_SECRET ) }
		},
		createUser: async ( root, async ) => {
			const user = new User({ username: args.username })

			try {
				await user.save()
			}
			catch( error ) {
				throw new UserInputError( error.message, {
					invalidArgs: args
				})
			}
		}
	},

	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null
		if( auth && auth.toLowerCase().startsWith('bearer ') ) {
			const decodedToken = jwt.verify(
				auth.substring(7), process.env.JWT_SECRET
			)
			const currentUser = await User.findById( decodedToken.id )
			return { currentUser }
		}
	}
})

server.listen().then(({ url, subscriptionsUrl }) => {
	console.log(`Server ready at ${url}`)
	console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})