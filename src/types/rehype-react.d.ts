// This is a bad workaround until there are better typings for this library
declare module 'rehype-react' {
    export default rehypeReact as any;
}