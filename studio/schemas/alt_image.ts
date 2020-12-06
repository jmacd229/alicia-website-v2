export default {
    name: "alt_image",
    title: "Image",
    type: "image",
    fields: [
        {
          title: "Alternate text (required for visually impaired user accessibility)",
          name: "alt",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
  };
  


