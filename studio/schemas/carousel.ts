export default {
  name: "carousel",
  title: "Carousel",
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
      name: "subtitle",
      title: "SubTitle",
      type: "string",
    },
    {
      name: "body",
      title: "Body text",
      type: "array",
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      title: "Slides",
      name: "slides",
      type: "array",
      of: [{type: "alt_image"},
      ],
    },
  ],
};
