export default {
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    {
      title: "Display text",
      name: "text",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "URL",
      name: "url",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
  ],
};
