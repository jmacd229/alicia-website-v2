export default {
    name: "work",
    title: "Work with Me",
    type: "document",
    fieldsets: [{ name: "book", title: "Book button" },{ name: "virtual", title: "Virtual button" }],
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
        title: "Visible",
        name: "bookVisible",
        type: "boolean",
        validation: (Rule) => Rule.required(),
        fieldset: "book",
      },
        {
          title: "Link",
          name: "bookLink",
          type: "link",
          fieldset: "book",
        },
        {
          title: "Visible",
          name: "virtualVisible",
          type: "boolean",
          validation: (Rule) => Rule.required(),
          fieldset: "virtual",
        },
          {
            title: "Link",
            name: "virtualLink",
            type: "link",
            fieldset: "virtual",
          },
      {
        name: "image",
        title: "Background image",
        type: "image",
      },
    ],
  };
  