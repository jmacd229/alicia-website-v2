export default {
  name: "aboutMe",
  title: "About Me",
  type: "document",
  __experimental_actions: ['update', 'publish'], 
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "body",
      title: "Body text",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "image",
      title: "image",
      type: "alt_image",
    },
  ],
};
