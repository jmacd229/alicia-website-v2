export default {
  name: "assets",
  title: "Assets",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Assets",
      name: "assets",
      type: "array",
      of: [{type: "image"},
      ],
    },
  ],
}; 
