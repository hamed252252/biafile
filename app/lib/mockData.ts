export interface Post {
    id: number;
    slug: string;
    title: string;
    author: string;
    date: string;
    excerpt: string;
    content: string;
    coverImage: string;
    readingTime: number;
    tags: string[];
}

export const posts: Post[] = [
    {
        id: 1,
        slug: "getting-started-with-nextjs",
        title: "Getting Started with Next.js",
        author: "John Doe",
        date: "2023-06-01",
        excerpt:
            "Learn how to build modern web applications with Next.js, the React framework for production.",
        content:
            "Next.js is a powerful React framework that enables you to build server-side rendered and statically generated web applications with ease. In this post, we'll explore the key features of Next.js and how to get started with your first project.\n\n## Why Next.js?\n\nNext.js offers several advantages over traditional React applications:\n\n1. **Server-Side Rendering (SSR)**: Improves initial load time and SEO.\n2. **Static Site Generation (SSG)**: Generate static pages for even faster load times.\n3. **File-based Routing**: Simplifies the creation of routes in your application.\n4. **API Routes**: Easily create API endpoints as part of your Next.js app.\n\n## Setting Up Your First Next.js Project\n\nTo create a new Next.js project, run the following command:\n\n```bash\nnpx create-next-app my-next-app\n```\n\nThis will set up a new Next.js project with all the necessary configurations.\n\n## Conclusion\n\nNext.js provides a robust framework for building modern web applications. Its features like SSR, SSG, and file-based routing make it an excellent choice for developers looking to create fast, SEO-friendly React applications.",
        coverImage:
            "/placeholder.svg?height=600&width=1200",
        readingTime: 5,
        tags: ["Next.js", "React", "Web Development"],
    },
    {
        id: 2,
        slug: "mastering-react-hooks",
        title: "Mastering React Hooks",
        author: "Jane Smith",
        date: "2023-06-15",
        excerpt:
            "Dive deep into React Hooks and learn how to write more efficient and cleaner React components.",
        content:
            "React Hooks have revolutionized the way we write React components. They allow you to use state and other React features without writing a class. In this post, we'll explore some of the most commonly used hooks and how to use them effectively.\n\n## useState\n\nThe useState hook allows you to add state to functional components. Here's a simple example:\n\n```jsx\nconst [count, setCount] = useState(0);\n```\n\n## useEffect\n\nuseEffect lets you perform side effects in functional components. It's similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined.\n\n```jsx\nuseEffect(() => {\n  document.title = `You clicked ${count} times`;\n}, [count]);\n```\n\n## useContext\n\nuseContext is used for consuming context in a functional component:\n\n```jsx\nconst theme = useContext(ThemeContext);\n```\n\n## Custom Hooks\n\nYou can also create your own custom hooks to reuse stateful logic between components.\n\n## Conclusion\n\nMastering React Hooks can significantly improve your React development experience, leading to cleaner and more efficient code.",
        coverImage:
            "/placeholder.svg?height=600&width=1200",
        readingTime: 7,
        tags: ["React", "Hooks", "JavaScript"],
    },
    {
        id: 3,
        slug: "introduction-to-graphql",
        title: "Introduction to GraphQL",
        author: "Alex Johnson",
        date: "2023-07-01",
        excerpt:
            "Discover GraphQL, the query language for your API, and why it's becoming increasingly popular among developers.",
        content:
            'GraphQL is a query language for APIs and a runtime for executing those queries with your existing data. It provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.\n\n## Key Concepts\n\n1. **Schema**: Defines the structure of your data and the operations that can be performed.\n2. **Queries**: Allow clients to request specific data.\n3. **Mutations**: Enable clients to modify data.\n4. **Subscriptions**: Real-time updates when data changes.\n\n## Example Query\n\n```graphql\nquery {\n  user(id: "123") {\n    name\n    email\n    posts {\n      title\n      content\n    }\n  }\n}\n```\n\n## Benefits of GraphQL\n\n- **Efficient Data Loading**: Clients can request exactly what they need.\n- **Strongly Typed**: The schema provides a clear contract for client-server communication.\n- **Introspection**: Clients can query the schema for details about the API.\n\n## Conclusion\n\nGraphQL offers a more flexible and efficient alternative to traditional REST APIs, making it an excellent choice for modern web and mobile applications.',
        coverImage:
            "/placeholder.svg?height=600&width=1200",
        readingTime: 6,
        tags: ["GraphQL", "API", "Web Development"],
    },
    {
        id: 4,
        slug: "css-grid-layout-explained",
        title: "CSS Grid Layout Explained",
        author: "Emily Brown",
        date: "2023-07-15",
        excerpt:
            "Learn how to create complex layouts with ease using CSS Grid, the most powerful layout system available in CSS.",
        content:
            "CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward.\n\n## Basic Concepts\n\n1. **Grid Container**: The element on which `display: grid` is applied.\n2. **Grid Items**: The children of the grid container.\n3. **Grid Lines**: The dividing lines that make up the structure of the grid.\n4. **Grid Tracks**: The space between two adjacent grid lines.\n5. **Grid Cell**: The space between four grid lines.\n6. **Grid Area**: The total space surrounded by four grid lines.\n\n## Creating a Grid\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n}\n```\n\n## Placing Items\n\n```css\n.item {\n  grid-column: 1 / 3;\n  grid-row: 1 / 3;\n}\n```\n\n## Advanced Features\n\n- **fr unit**: Represents a fraction of the available space.\n- **minmax()**: Sets a minimum and maximum size for a track.\n- **auto-fit and auto-fill**: Create a responsive grid without media queries.\n\n## Conclusion\n\nCSS Grid Layout provides a powerful toolset for creating complex layouts with clean, easy-to-understand CSS. It's well-supported in modern browsers and can significantly simplify your layout code.",
        coverImage:
            "/placeholder.svg?height=600&width=1200",
        readingTime: 8,
        tags: ["CSS", "Web Design", "Layout"],
    },
    {
        id: 5,
        slug: "typescript-best-practices",
        title: "TypeScript Best Practices",
        author: "Michael Lee",
        date: "2023-08-01",
        excerpt:
            "Explore best practices for writing clean, maintainable, and error-free TypeScript code.",
        content:
            "TypeScript has become increasingly popular due to its ability to add static typing to JavaScript. However, to get the most out of TypeScript, it's important to follow best practices. In this post, we'll explore some key practices to improve your TypeScript code.\n\n## Use Strict Mode\n\nEnable strict mode in your `tsconfig.json` to catch more errors:\n\n```json\n{\n  \"compilerOptions\": {\n    \"strict\": true\n  }\n}\n```\n\n## Prefer Interfaces over Type Aliases\n\nInterfaces are often more flexible and can be extended:\n\n```typescript\ninterface User {\n  name: string;\n  age: number;\n}\n```\n\n## Use Union Types\n\nUnion types allow a value to be one of several types:\n\n```typescript\ntype Result = Success | Error;\n```\n\n## Avoid `any`\n\nUse `unknown` instead of `any` when the type is not known:\n\n```typescript\nfunction processValue(value: unknown) {\n  if (typeof value === 'string') {\n    // value is treated as a string here\n  }\n}\n```\n\n## Use Generics\n\nGenerics provide more reusable and type-safe code:\n\n```typescript\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n```\n\n## Conclusion\n\nBy following these best practices, you can write more robust and maintainable TypeScript code, leveraging the full power of the type system to catch errors early and improve your development experience.",
        coverImage:
            "/placeholder.svg?height=600&width=1200",
        readingTime: 7,
        tags: [
            "TypeScript",
            "JavaScript",
            "Best Practices",
        ],
    },
];

export function getPosts() {
    return posts;
}

export function getPostBySlug(slug: string) {
    return posts.find((post) => post.slug === slug);
}
