export default {
    name: "contact",
    title: "Contact",
    type: "document",
    __experimental_actions: ['update', 'publish'], 
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "methods",
        title: "Contact Methods",
        type: "array",
        of: [
          {
            type: "contact_method",
          },
        ],
      },
    ],
  };
  