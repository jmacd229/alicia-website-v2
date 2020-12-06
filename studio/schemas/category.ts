export default {
    name: "category",
    title: "Category",
    type: "object",
    fields: [
        {
          title: "Name",
          name: "name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
            title: "Resources",
            name: "resources",
            type: "array",
            of: [{type: "resource"},
            ],
          },
      ],
  };
  


