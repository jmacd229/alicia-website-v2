export default {
    name: "work",
    title: "Work with Me",
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
        title: "Background image",
        type: "image",
      },
    ],
  };
  