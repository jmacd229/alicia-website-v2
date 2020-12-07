export default {
    name: "contact_method",
    title: "Contact Method",
    type: "object",
    fields: [
        {
          title: "Visible",
          name: "visible",
          type: "boolean",
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Id",
          name: "id",
          type: "string",
          hidden: true
        },
        {
          title: "Title",
          name: "title",
          type: "string",
        },
        {
          title: "Label",
          name: "label",
          type: "array",
          of: [
            {
              type: "string",
            },
          ],
        },
        {
          title: "Link",
          name: "url",
          type: "url",
        },
      ],
  };
