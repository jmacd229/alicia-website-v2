export default {
  name: "resource",
  title: "Resource",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Link",
      name: "link",
      type: "link",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
        },
      ],
    },
  ],
};
