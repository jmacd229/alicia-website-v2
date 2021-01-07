export default {
    name: "contact",
    title: "Contact",
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
        type: "mixed_font_text",
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
      {
        name: "locations",
        title: "Locations",
        type: "array",
        of: [
          {
              name: "location",
              title: "Location",
              type: "reference",
              to: [{type: 'location'}]
          },
        ],
      },
    ],
  };
  