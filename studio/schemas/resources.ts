export default {
    name: "resources",
    title: "Resources",
    type: "document",
     __experimental_actions: ['update', 'publish'], 
    fields: [
      {
        title: "Visible",
        name: "visible",
        type: "boolean",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "image",
        title: "Background image",
        type: "image",
      },
      {
        title: "Categories",
        name: "categories",
        type: "array",
        of: [{type: "category"},
        ],
      },
    ],
  };
  