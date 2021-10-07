export default {
  name: "booking",
  title: "Booking",
  type: "object",
  fields: [
    {
      name: "url",
      title: "Booking url",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "reference",
      to: [{ type: "location" }],
      validation: (Rule) => Rule.required(),
    },
  ],
};
