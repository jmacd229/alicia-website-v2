export default {
    name: "work",
    title: "Work with Me",
    type: "document",
    fieldsets: [{ name: "virtual", title: "Virtual Booking" }],
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
              title: "In-person Booking",
              name: "bookLink",
              type: "array",
              of: [
                {
                  type: "booking",
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
  