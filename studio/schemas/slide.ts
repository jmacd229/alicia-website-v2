export default {
    name: "slide",
    title: "Slide",
    type: "image",
    fields: [
        {
          title: "Alternate text",
          name: "alt",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
  };
  


