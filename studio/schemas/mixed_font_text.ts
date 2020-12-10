export default {
  type: "object",
  name: "mixed_font_text",
  fieldsets: [{ name: "mixed_font_text", title: "Mixed Font Text" }],
  fields: [
    {
      title: "Regular font part",
      name: "regular",
      type: "string",
      fieldset: "mixed_font_text",
    },
    {
      title: "Cursive font part",
      name: "cursive",
      type: "string",
      fieldset: "mixed_font_text",
    },
  ],
};
