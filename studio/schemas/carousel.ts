export default {
  name: "carousel",
  title: "Carousel",
  type: "document",
  fields: [
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
      type: "text",
    },
    {
      title: "Slides",
      name: "slides",
      type: "array",
      of: [{type: "slide"},
      ],
    },
  ],
};
